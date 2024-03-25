// // /backend/controllers/orderController.js
// import Order from '../models/Order.js';


// // POST /api/hotels
// const createOrder = async (req, res) => {
//   try {
//     const { userName, phoneNo, address, userId } = req.body;

//     // Create a new OrderDetails instance
//     const newOrderDetail = new Order({
//       userName,
//       phoneNo,
//       address,
//       userId
//     });

//     const savedOrderDetail = await newOrderDetail.save();

//     res.status(201).json(savedOrderDetail);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// const checkUserId = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const existingOrders = await Order.find({ userId });

//     if (existingOrders.length > 0) {
//       res.status(200).json({ hasOrders: true });
//     } else {
//       res.status(200).json({ hasOrders: false });
//     }
//   } catch (error) {
//     console.error('Error checking user orders:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
  
//   export {
//     createOrder,
//     checkUserId
//   };
 // /backend/controllers/orderController.js
import Order from '../models/Order.js';

// POST /api/hotels
const createOrder = async (req, res) => {
  try {
    const { userName, phoneNo, address, userId } = req.body;

    // Create a new OrderDetails instance
    const newOrderDetail = new Order({
      userName,
      phoneNo,
      address,
      userId
    });

    const savedOrderDetail = await newOrderDetail.save();

    res.status(201).json(savedOrderDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/orders/:orderId
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PUT /api/orders/:orderId
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { userName, phoneNo, address } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { userName, phoneNo, address },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const checkUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const existingOrders = await Order.find({ userId });

    if (existingOrders.length > 0) {
      res.status(200).json({ hasOrders: true });
    } else {
      res.status(200).json({ hasOrders: false });
    }
  } catch (error) {
    console.error('Error checking user orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
export {
  createOrder,
  checkUserId,
  getAllOrders,
  getOrderById,
  updateOrder
};
