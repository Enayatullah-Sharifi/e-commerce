import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Success() {
  const dispatch = useDispatch();
  const query = useQuery();
  const orderId = query.get("orderId");
  const [status, setStatus] = useState("checking");
  const navigate = useNavigate();

  useEffect(() => {
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;

      const res = await fetch(`/api/orders/${orderId}/status`);
      const data = await res.json();

      if (data.paid) {
        setStatus("paid");
        clearInterval(interval);
      }

      if (attempts > 10) {
        setStatus("pending");
        clearInterval(interval);
      }
    }, 2000);
    if (status === "paid") {
      dispatch(clearCart());
    }
    return () => clearInterval(interval);
  }, [dispatch, status, orderId]);

  if (status === "checking") {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center flex-col">
        <span>Verifying payment...</span>
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  if (status === "paid") {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="border p-10 rounded-md border-pink-200 font-bold hover:border-pink-500 hover:scale-101 transform transition duration-300">
          Payment successful! Thank you.{" "}
          <button
            className="cursor-pointer"
            onClick={() => navigate("../cart")}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }
  if (status === "unpaid")
    return (
      <div>
        Payment not completed.{" "}
        <button onClick={() => navigate("/retry")}>Try Again</button>
      </div>
    );
  return <div>There was an error verifying payment.</div>;
}
