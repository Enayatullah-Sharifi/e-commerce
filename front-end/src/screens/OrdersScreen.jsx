import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllOrders, updateOrderDelivery } from "../api/admin";

const OrderScreen = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isUpdating } = useMutation({
    mutationFn: updateOrderDelivery,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    staleTime: Infinity,
  });

  if (isLoading)
    return (
      <p className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </p>
    );
  if (isError)
    return (
      <p className="w-full h-screen flex items-center justify-center">
        Error: {error?.message}
      </p>
    );

  const handleToggleDelivery = async (order) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: order.delivered
        ? "This order will be marked as NOT delivered."
        : "This order will be marked as delivered.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
    });

    if (!result.isConfirmed) return;

    await mutateAsync({
      orderId: order?._id,
      delivered: !order?.delivered,
    });
  };

  return (
    <div className=" dark:bg-slate-900 min-h-[92vh]">
      <div className="w-full max-w-6xl mx-auto p-4 mt-12  dark:bg-slate-900">
        <Link
          to="/dashboard"
          className=" bg-(--dark-red--color) text-white px-3 py-1 rounded-sm dark:text-white/80"
        >
          Go Back
        </Link>
        <h2 className="text-2xl font-bold my-6 text-gray-800 dark:text-white">
          Orders List
        </h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full border-collapse text-sm md:text-base dark:bg-slate-800 dark:text-white">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Products</th>

                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Qty</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Delevery</th>
              </tr>
            </thead>
            <tbody>
              {data?.orders?.length === 0 ? (
                <tr>
                  <td className="p-3 font-semibold">No Order found</td>
                </tr>
              ) : (
                data?.orders?.map((order) => (
                  <tr
                    key={order?._id}
                    className="border-b hover:bg-gray-100 dark:hover:bg-slate-700 transition duration-150"
                  >
                    <td className="py-3 px-4 font-medium">
                      {order?._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="py-3 px-4 w-fit whitespace-nowrap">
                      {order?.items?.map((item, index) => (
                        <p key={item?._id || index}>{item?.name}</p>
                      ))}
                    </td>
                    <td className="py-3 px-4 w-fit whitespace-nowrap">
                      {order?.user?.username}
                    </td>
                    <td className="py-3 px-4 w-fit whitespace-nowrap">
                      $ {order?.itemPrice}
                    </td>
                    <td className="py-3 px-4 w-fit whitespace-nowrap">
                      {order?.items?.length}
                    </td>
                    <td className="py-3 px-4 min-w-fit">{order.status}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          disabled={isUpdating}
                          checked={order?.delivered}
                          onChange={() => handleToggleDelivery(order)}
                        />

                        <span
                          className={
                            order?.delivered
                              ? "text-green-600 font-medium"
                              : "text-red-600 font-medium"
                          }
                        >
                          {order?.delivered ? "Delivered" : "Not Delivered"}
                        </span>
                      </label>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
