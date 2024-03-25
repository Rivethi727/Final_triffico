import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import stripe from 'stripe';
import Product from '../models/DetailModel.js';

const router = Router();
const stripeSecretKey = "sk_test_51OsnUy02o4cIhCMgXsuK0yFGzsaOS4Z93oy2bZwrrcYBbRRVioFGqKg8P0C9IEwvPYzGk6MVjfUglziyChDEfSbh00aTkBVetP";
const stripeInstance = stripe(stripeSecretKey);

router.post("/payment", async (req, res) => {
  try {
    console.log("it's working good");
    const { bookingData, token } = req.body;
    console.log(token)
    const product = bookingData[0];
    const transactionKey = uuidv4();

    const customer = await stripeInstance.customers.create({
      email: token.email,
      source: token.id
    });
    console.log(customer)

    const chargeResult = await stripeInstance.charges.create({
      amount: product.totalAmount * 100, // Multiply by 100 for cents
      currency: "LKR",
      customer: customer.id,
      receipt_email: token.email,
      description: product.selectedHotelName

    });

    // Save transaction details to the Product model or any other model as needed
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: product._id },
      { $push: { transactions: { transactionKey, amount: product.price } } },
      { new: true }
    );

    res.json(chargeResult);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
