// /backend/routes/bookingRoutes.js
import express from 'express';
const router = express.Router();
import  {createbooking,getbookingById,getAllBookings} from '../controllers/bookingController.js';

router.route('/create-booking').post(createbooking);
router.route('/getbooking/:userId').get(getbookingById);

router.route('/get-all-bookings').get(getAllBookings);

export default router;
