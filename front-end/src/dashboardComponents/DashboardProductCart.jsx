import React from "react";
import { getAllProducts } from "../api/getProduct";
import { useQuery } from "@tanstack/react-query";
import { FaBox } from "react-icons/fa";
import { Loader2 } from "lucide-react";

const DashboardProductCart = ({ onClick }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: getAllProducts,
    staleTime: Infinity,
  });
  return (
    <div
      onClick={onClick}
      className="col-span-12 bg-white flex h-20 gap-4 items-center px-4 rounded-sm shadow-lg  md:col-span-4 lg:col-span-3 cursor-pointer hover:scale-102 transition-transform duration-300 dark:bg-slate-800"
    >
      <div className="bg-[#ed9e59] p-4 text-3xl text-black rounded-lg">
        <FaBox />
      </div>
      <div>
        <div className="text-2xl font-semibold">Products</div>
        <div className="text-2xl font-semibold">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            data?.products?.length
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardProductCart;
