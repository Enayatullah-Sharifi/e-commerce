import express from "express";
import expressAsyncHandler from "express-async-handler";
import Stripe from "stripe";
import Order from "../model/Order.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("❌ Stripe Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (
    event.type === "checkout.session.completed" &&
    event.data.object.payment_status === "paid"
  ) {
    const session = event.data.object;
    if (!session.metadata || !session.metadata.orderId) {
      console.error("❌ Missing orderId in metadata");
      return res.status(400).json({ error: "Missing orderId" });
    }

    await Order.findByIdAndUpdate(orderId, {
      status: "expired",
    });
  }

  // ✅ PAYMENT CONFIRMATION HAPPENS ONLY HERE
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // 🔑 Get orderId from metadata
    const orderId = session.metadata.orderId;

    // Update order status
    const order = await Order.findById(orderId);

    if (order && order.status !== "paid") {
      order.status = "paid";
      order.stripeSessionId = session.id;
      await order.save();
    }
  }

  res.json({ received: true });
});

export default router;
