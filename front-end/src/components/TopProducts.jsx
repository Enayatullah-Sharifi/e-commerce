import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTopProducts } from "../api/getProduct";
import ItemCard from "./ItemCard";

const TopProducts = () => {
  // Get top products
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["topProducts"],
    queryFn: getTopProducts,
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <Loader2
        className="w-full animate-spin flex items-center justify-center"
        size={40}
      />
    );
  }

  return (
    <>
      <h1 className=" capitalize text-center text-2xl font-bold mt-24 mb-5  text-slate-700 md:uppercase dark:text-white/50">
        Top Products
      </h1>

      {isError && (
        <h1 className="text-center text-red-500 font-bold text-3xl col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5">
          404 {error?.message}
        </h1>
      )}
      <div className="container grid grid-cols-2 gap-4 p-2 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data &&
          data?.map((product) => (
            <ItemCard
              key={product?.productId}
              productId={product?.productId}
              {...product}
              type="top"
            />
          ))}
      </div>
    </>
  );
};

export default TopProducts;
