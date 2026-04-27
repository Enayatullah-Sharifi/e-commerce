import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllOrders } from "../api/admin";
import { Loader2 } from "lucide-react";
import { FaDollarSign } from "react-icons/fa";

const DashboardSalesCart = ({ onClick }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["adminSalesCart"],
    queryFn: getAllOrders,
    staleTime: Infinity,
  });

  return (
    <div
      onClick={onClick}
      className="col-span-12 bg-white flex h-20 gap-4 items-center px-4 rounded-sm shadow-lg  md:col-span-4 lg:col-span-3 cursor-pointer hover:scale-102 transition-transform duration-300 dark:bg-slate-800"
    >
      <div className="bg-[#44174e] p-4 text-3xl text-white rounded-lg">
        <FaDollarSign />
      </div>
      <div>
        <div className="text-2xl font-semibold">Sales</div>
        <div className="text-2xl font-semibold ">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            data?.orders
              ?.reduce((sum, order) => sum + order.totalPrice, 0)
              .toFixed(2)
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSalesCart;
