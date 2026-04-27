import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import CartsCart from "../components/cartsCart";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeOrder } from "../api/placeOrder";

const Cart = () => {
  const { cartItems, itemPrice, shippingPrice, totalPrice, taxPrice } =
    useSelector((state) => state.cart);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (cartItems) => placeOrder(cartItems),
    onSuccess: async (data) => {
      if (data?.url) {
        window.location.href = data?.url;
      } else {
        console.log("No session URL found");
      }
      queryClient.invalidateQueries({ queryKey: ["usersOrder"] });
    },
    onError: (err) => {
      toast.error(err?.message);
      console.log(err);
    },
  });

  return (
    <div className="min-h-dvh md:max-h-screen md:h-screen dark:bg-slate-900 py-5">
      {/* Back btn */}
      <div className="container mx-auto px-2 my-5">
        <Link
          to=".."
          className="bg-[var(--dark-red--color)] px-3 py-1 text-white capitalize rounded-sm"
        >
          go back
        </Link>
      </div>

      <div className="min-w-full p-4 container gap-5 mx-auto  md:max-h-132.5  grid md:grid-cols-3 dark:bg-slate-900 dark:text-white/70">
        {/* carts */}
        <div className="md:col-span-2 max-h-125  overflow-y-auto py-8 md:px-3 flex flex-col gap-2 dark:bg-slate-900">
          {cartItems.length > 0 ? (
            cartItems?.map((c) => <CartsCart key={c?._id} props={c} />)
          ) : (
            <div className="flex items-center gap-5 justify-center text-lg font-bold bg-white py-5 shadow dark:bg-slate-800">
              Cart is empty <FaCartPlus size={30} />
            </div>
          )}
        </div>

        {/* Add to cart form */}
        <div className="md:col-span-1">
          <div className="border p-3 max-h-96 mt-12">
            <h1 className="text-xl font-semibold py-2">Price Details</h1>
            <hr />
            <div className="flex items-center justify-between">
              <p className="p-3 text-lg text-green-600">
                Price ({cartItems.length} items){" "}
              </p>
              <p className="font-semibold text-lg">${itemPrice}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="p-3 text-lg">Discount </p>
              <p className="font-semibold text-lg">$00</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="p-3 text-lg">Delivery Charges </p>
              <p className="font-semibold text-lg">${shippingPrice}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="p-3 text-lg">Tax Charges </p>
              <p className="font-semibold text-lg">${taxPrice}</p>
            </div>
            <hr />
            <div className="flex font-semibold items-center justify-between">
              <p className="p-3 text-lg">Total Amount</p>
              <p className=" text-lg">${totalPrice}</p>
            </div>
            <button
              className="bg-(--dark-red--color) text-white p-2 mt-5 w-full uppercase cursor-pointer flex items-center justify-center"
              onClick={() => mutate(cartItems)}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
