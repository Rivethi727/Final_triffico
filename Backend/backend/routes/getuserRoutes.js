import express from 'express';
const router = express.Router();
import { getUserByEmail } from '../controllers/getuserController.js';


router.get('/:email', getUserByEmail);

export default router;