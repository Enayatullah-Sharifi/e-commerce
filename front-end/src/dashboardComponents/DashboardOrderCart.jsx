import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllOrders, getAllUsers } from "../api/admin";
import { Loader2 } from "lucide-react";
import { FaBook, FaUsers } from "react-icons/fa";

const DashboardOrderCart = ({ onClick }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["adminOrderCart"],
    queryFn: getAllOrders,
    staleTime: Infinity,
  });
  return (
    <div
      onClick={onClick}
      className="col-span-12 bg-white flex h-20 gap-4 items-center px-4 rounded-sm shadow-lg  md:col-span-4 lg:col-span-3 cursor-pointer hover:scale-102 transition-transform duration-300 dark:bg-slate-800"
    >
      <div className="bg-[#a34054] p-4 text-3xl text-white rounded-lg">
        <FaBook />
      </div>
      <div>
        <div className="text-2xl font-semibold">Orders</div>
        <div className="text-2xl font-semibold">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            data?.orders?.length
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOrderCart;
