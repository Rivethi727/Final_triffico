import express from 'express';
const router = express.Router();
import   getUserById from '../controllers/getController.js';


router.route('/getUserById/:userId').get(getUserById);

export default router;
