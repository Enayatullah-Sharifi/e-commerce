import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { FaSpinner } from "react-icons/fa";

export default function PaymentForm({ orderId }) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState("ready");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setMessage("Stripe is not Ready yet!");
      return;
    }

    setLoading(true);
    setStatus("processing");

    const CardElement = elements.getElement(CardElement);
    const clientSecret = sessionStorage.getItems("clientSecret");
    if (!clientSecret) {
      setMessage("missing payment details");
      setLoading(false);
      return;
    }
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card: CardElement },
      },
    );

    if (error) {
      setStatus("error");
      setLoading(false);
      setMessage(error.message | "payment failed");
    }
    if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("payment successful!");
    } else {
      setMessage("Payment not completed");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded-lg"
    >
      <h2 className="text-xl font-semibold mb-4">Complete Your Payment</h2>

      <PaymentElement />

      <button
        type="submit"
        disabled={!stripe || status === "processing"}
        className="bg-blue-600 text-white mt-4 px-4 py-2 rounded hover:bg-blue-700"
      >
        {status === "processing" ? "Processing..." : "Pay Now"}
      </button>

      {loading ? (
        <FaSpinner className="spin" />
      ) : (
        message && <p className="text-red-500 mt-2">{message}</p>
      )}
    </form>
  );
}
