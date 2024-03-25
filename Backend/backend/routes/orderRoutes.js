// /backend/routes/orderRoutes.js
// import express from 'express';
// const router = express.Router();
// import { createOrder,checkUserId } from '../controllers/orderController.js';

// router.route('/create-order').post(createOrder);
// router.route('/check-user-orders/:userId').get(checkUserId);

// export default router;
// /backend/routes/orderRoutes.js
import express from 'express';
const router = express.Router();
import {
  createOrder,
  checkUserId,
  getAllOrders,
  getOrderById,
  updateOrder
} from '../controllers/orderController.js';

router.route('/create-order').post(createOrder);
router.route('/check-user-orders/:userId').get(checkUserId);
router.route('/orders').get(getAllOrders);
router.route('/orders/:orderId').get(getOrderById).put(updateOrder);

export default router;
