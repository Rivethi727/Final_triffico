import express from 'express';
const router = express.Router();
import {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from '../controllers/adminController.js';

router.route('/users').get(getUsers);
router.route('/users/:id').get(getUserById);
router.route('/users').post(createUser);
router.route('/user/new/:id').put(updateUser);
router.route('/user/:id').delete(deleteUser);

export default router;
