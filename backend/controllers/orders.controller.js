import expressAsyncHandler from "express-async-handler";
import Order from "../model/Order.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Calculate product datail
function calculateProductDetail(cartItems) {
  const imgUrls = cartItems?.map(
    (image) => `${process.env.BASE_URL}` + image.img,
  );

  // Add decimal to price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // calculate item price
  const itemPrice = cartItems.reduce(
    (acc, item) => acc + (item.discountedPrice ?? item.realPrice) * item.qty,
    0,
  );

  // calculate shipping price (if over $100 free else $10);
  const shippingPrice = addDecimals(itemPrice < 100 ? 10 : 0);

  // calculate tax price
  const taxPrice = addDecimals(Number((0.15 * itemPrice).toFixed(2)));

  // calculate total price
  const totalPrice = (
    Number(itemPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  return { totalPrice, taxPrice, shippingPrice, itemPrice, imgUrls };
}

// @desc    post place an order
// @route   POST    /api/order
// @access  Private
export const placeOrder = expressAsyncHandler(async (req, res) => {
  const imageUrl = item.img?.startsWith("http")
    ? item.img
    : `${process.env.BASE_URL}${item.img || ""}`;

  const cartItems = req.body;
  if (cartItems.length < 1) {
    res.status(400).json({ message: "Cart is empty!" });
  }
  const { totalPrice, taxPrice, itemPrice, shippingPrice, imgUrls } =
    calculateProductDetail(cartItems);

  const productLineItems = cartItems.map((item) => {
    const price = Number(item.discountedPrice ?? item.realPrice);
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
           images: item.img ? [imageUrl] : [],
        },
        unit_amount: Math.round(price * 100),
      },

      quantity: item.qty,
    };
  });

  const shippingLineItem = {
    price_data: {
      currency: "usd",
      product_data: { name: "Shipping Fee" },
      unit_amount: shippingPrice * 100,
    },
    quantity: 1,
  };
  const taxLineItem = {
    price_data: {
      currency: "usd",
      product_data: { name: "Tax" },
      unit_amount: Math.round(taxPrice * 100),
    },
    quantity: 1,
  };

  let order = await Order.findOne({
    user: req.user.id,
    status: "pending",
  });

  if (!order) {
    order = await Order.create({
      user: req.user.id,
      items: cartItems,
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      status: "pending",
    });
  }

  const line_items = [...productLineItems, shippingLineItem, taxLineItem];
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.CLIENT_SIDE_URL}/success?orderId=${order._id}`,

    cancel_url: `${process.env.CLIENT_SIDE_URL}/cancel`,
    // customer_email:
    metadata: {
      orderId: order._id.toString(),
    },

    line_items,
  });

  order.stripeSessionId = session.id;
  await order.save();

  res.status(200).json({
    url: session.url,
  });
});

// @desc    get orders by userId
// @route   GET /api/order
// @access  Private
export const getOrders = expressAsyncHandler(async (req, res) => {
  const user = req.user.id;
  const orders = await Order.find({ user: user });

  res.status(200).json({ success: true, orders });
});
