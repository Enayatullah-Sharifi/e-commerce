import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  const [orderId, setOrderId] = useState(null);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderId(params.get("order_id"));
  }, []);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col gap-2">
      
      <h1 className="text-2xl text-red-800">Payment Cancelled</h1>
      <p className="text-xl">Your order {orderId} was not completed. <Link to='../' className="underline mx-2 cursor-pointer text-blue-500" >
        Home Page
      </Link></p>
      <button className="bg-blue-500 py-2 px-5 mt-10 rounded-md text-white text-xl" onClick={() => window.location.href = "/cart"}>
        Try Again
      </button>
    </div>
  );
};

export default Cancel;
