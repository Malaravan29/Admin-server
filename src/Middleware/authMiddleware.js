import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Admin from '../Models/Admin.js';

dotenv.config();
const { JWT_SECRET } = process.env;

const verifyToken = async (req, res, next) => {
  try {
    const PATH = req.path;

    const openPaths = [
      '/validate-user', '/verify-otp', '/login', '/reset-password', '/register-admin','/register-user',
      '/forget-password', '/password-otp-verify', '/forget-reset-password'
    ];
    if (openPaths.includes(PATH)) {
      return next();
    }

    const authorization = req.headers['authorization'];
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header not found' });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access token not found' });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
   // console.log("Decoded Token:", decodedToken);
    req.user = decodedToken;

    const user = await Admin.findById(decodedToken.id);
    // console.log('User', user);
    if(!user){
      return res.status(404).json({ message: "User not found"});
    }
 
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role
    };
    // console.log('Request User:', req.user);
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Access token has expired' });
    }
    return res.status(403).json({ message: 'Token verification failed' });
  }
};
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log(`User role: ${req.user.role}`);
    console.log(`Allowed roles: ${allowedRoles}`);
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

export { verifyToken, verifyRoles };
