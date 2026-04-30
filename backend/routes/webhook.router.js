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

  const session = event.data.object;

  console.log("🔥 EVENT:", event.type);

  try {
    if (event.type === "checkout.session.completed") {
      const orderId = session.metadata?.orderId;

      if (!orderId) {
        console.error("❌ Missing orderId");
        return res.status(400).json({ error: "Missing orderId" });
      }

      const order = await Order.findById(orderId);

      if (!order) {
        console.error("❌ Order not found");
        return res.status(404).json({ error: "Order not found" });
      }

      if (order.status !== "paid") {
        order.status = "paid";
        order.stripeSessionId = session.id;
        await order.save();
        console.log("✅ Order marked paid:", orderId);
      }
    }
  } catch (err) {
    console.error("❌ Webhook processing error:", err.message);
    return res.status(500).json({ error: err.message });
  }

  res.json({ received: true });
});

export default router;
