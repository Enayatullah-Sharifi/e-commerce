// CheckoutForm.jsx
import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

export default function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent.status === "succeeded") {
      setMessage("✅ Payment successful!");
      // 🔹 You can now tell backend to mark order as paid
      // await axios.put(`/api/order/${orderId}/pay`, paymentIntent);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "20px auto" }}>
      <CardElement />
      <button
        disabled={!stripe || loading}
        style={{ marginTop: 20, padding: 10, backgroundColor: "blue", color: "white" }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      <p>{message}</p>
    </form>
  );
}
