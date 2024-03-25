// /backend/routes/bookingRoutes.js
import express from 'express';
const router = express.Router();
import  getAllBookings from '../controllers/getBooking.js';



router.route('/getAllBookings').get(getAllBookings);

export default router;
