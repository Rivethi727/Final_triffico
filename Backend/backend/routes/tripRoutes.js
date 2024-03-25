
// routes/tripRoutes.js
import express from 'express';
import { createTrip, updateTrip, getAllTrips, getTripById, getTripByUserId } from '../controllers/tripController.js';

const router = express.Router();

router.post('/', createTrip);
router.put('/:id', updateTrip);
router.get('/getbyId/:userId', getTripByUserId); // Define this route before other routes
router.get('/', getAllTrips);
router.get('/:id', getTripById);

export default router;

