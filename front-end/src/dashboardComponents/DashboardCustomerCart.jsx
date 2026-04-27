import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllUsers } from "../api/admin";
import { Loader2 } from "lucide-react";
import { FaUsers } from "react-icons/fa";

const DashboardCustomerCart = ({ onClick }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["adminUserCart"],
    queryFn: getAllUsers,
    staleTime: Infinity,
  });
  return (
    <div
      onClick={onClick}
      className="col-span-12 bg-white flex h-20 gap-4 items-center px-4 rounded-sm shadow-lg  md:col-span-4 lg:col-span-3 cursor-pointer hover:scale-102 transition-transform duration-300 dark:bg-slate-800 "
    >
      <div className="bg-black p-4 text-3xl text-white rounded-lg">
        <FaUsers />
      </div>

      <div>
        <div className="text-2xl font-semibold">Customers</div>
        <div className="text-2xl font-semibold">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            data?.users.length
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomerCart;
