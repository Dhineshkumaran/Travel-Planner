import Razorpay from 'razorpay';
import express from 'express';

const razorpay = new Razorpay({
  key_id: 'rzp_test_4rdgre6savrrmw',
  key_secret: 'ChIfjFDQzArGvs9JD0eMGxLw'
});

const router = express.Router();

router.post('/', async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1"
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;