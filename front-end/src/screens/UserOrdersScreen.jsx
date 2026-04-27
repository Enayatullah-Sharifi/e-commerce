import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { data, Link } from "react-router-dom";
import { getOrders } from "../api/placeOrder";
import { Loader2 } from "lucide-react";

const statusColor = (status) => {
  switch (status) {
    case "shipped":
      return "bg-blue-100 text-blue-700";
    case "paid":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const OrderTable = () => {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["usersOrder"],
    queryFn: getOrders,
    staleTime: Infinity,
  });

  if (isLoading)
    return (
      <p className="w-full h-[100vh] flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </p>
    );
  if (isError)
    return (
      <p className="w-full h-[100vh] flex items-center justify-center">
        Error: {error.message}
      </p>
    );

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Link
        to="/"
        className=" bg-[var(--dark-red--color)] text-white px-3 py-1 rounded-sm dark:text-white/80"
      >
        Go Back
      </Link>
      {orders?.length === 0 ? (
        <p className="w-full flex justify-center text-xl font-bold text-red-600">404 No orders found</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold my-6 text-gray-800 w-fit whitespace-nowrap">
            📦 Order List
          </h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table className="min-w-full border-collapse text-sm md:text-base">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left w-fit whitespace-nowrap">
                    Order ID
                  </th>

                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition duration-150"
                  >
                    <td className="py-3 px-4 font-medium w-fit whitespace-nowrap">
                      {order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="py-3 px-4 min-w-max w-fit whitespace-nowrap">
                      {order?.items.map((item) => (
                        <p>{item.name}</p>
                      ))}
                    </td>
                    <td className="py-3 px-4 w-fit whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 w-fit whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold w-fit whitespace-nowrap">
                      ${order.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderTable;
