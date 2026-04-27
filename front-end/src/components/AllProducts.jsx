import ItemCard from "./ItemCard";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Loader2Icon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/getProduct";
import { useState } from "react";

const AllProducts = () => {
  const [page, setPage] = useState(1);
  const limit = 24;

  // Get all products
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["allProducts", page, limit],
    queryFn: () => getAllProducts(page, limit),
    keepPreviousData: true,
    staleTime: 4 * 60 * 1000,
  });
  const totalPages = Array.from({ length: data?.totalPage }, (_, i) => i + 1);

  return (
    <div className="min-w-full min-h-37.5">
      {data?.result?.map((r) => (
        <div>{r.discountedPrice}</div>
      ))}
      <h1 className=" text-2xl font-bold text-slate-700 capitalize text-center  md:uppercase dark:text-white/50 my-10">
        All products
      </h1>
      {isLoading && (
        <Loader2Icon
          className="w-full animate-spin flex items-center justify-center"
          size={40}
        />
      )}

      {isError && (
        <h1 className="text-center text-red-500 font-bold text-3xl col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5">
          404 {error?.message}
        </h1>
      )}
      <>
        <div className="container grid grid-cols-2 gap-4 p-2 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data &&
            !isError &&
            !isLoading &&
            data?.products?.map((product) => (
              <ItemCard
                key={product?._id}
                productId={product?._id}
                {...product}
                type="all"
              />
            ))}
        </div>
      </>

      <div className="w-full flex justify-center items-center my-10">
        <div className="bg-white px-7 rounded-full shadow-2xl pagination  flex items-center justify-center gap-5 py-2 dark:bg-slate-700">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="dark:text-white"
          >
            <FaArrowAltCircleLeft size={25} className="cursor-pointer" />
          </button>

          {totalPages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                scale: p === page ? "1" : ".5",
                marginLeft: "0.25rem",
              }}
              className="dark:text-white"
            >
              <span className=" w-3 h-3 rounded-full bg-gray-700 dark:bg-white inline-block cursor-pointer"></span>
            </button>
          ))}

          <button
            className="dark:text-white"
            disabled={page == data?.totalPage}
            onClick={() => setPage((p) => p + 1)}
          >
            <FaArrowAltCircleRight size={25} className="cursor-pointer" />
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default AllProducts;
