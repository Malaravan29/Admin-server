import { Router } from 'express';
import { initailLogin, verifyOtp, resetPassword, login, forgotPasswordOtpVerify, forgotPasswordOtpSend, forgetResetPassword } from '../Controllers/authController.js';

const router = Router();

router.post('/validate-user', initailLogin);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.post('/login', login);


//forget password 
router.post('/forget-password', forgotPasswordOtpSend);
router.post('/password-otp-verify', forgotPasswordOtpVerify);
router.post("/forget-reset-password",forgetResetPassword);

export default router;
