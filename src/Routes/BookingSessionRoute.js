import express from "express"
import {bookSession,getBlockedDates,getAllSessions } from "../Controllers/bookingsesssion.js";

const router = express.Router()

router.post("/book-session",bookSession)
router.get("/blocked-dates",getBlockedDates)
router.get('/sessions', getAllSessions);

export default router;