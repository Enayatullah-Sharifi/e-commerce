import { Link } from "react-router-dom";
import WishlistCart from "../components/WishlistCart";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { getWishlist } from "../api/wishlist";

const Wishlist = () => {
  // Get wishlist
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    staleTime: Infinity,
  });



  return (
    <div className="dark:bg-slate-900 p-3 dark:text-white/70 min-h-screen w-full">
      <div className="container mx-auto p-2 ">
        <Link
          to="/"
          className="bg-(--dark-red--color) text-white px-3 py-1 rounded-sm dark:text-white/80"
        >
          Go Back
        </Link>
        {/* Wishlist header */}
        <div className="wishlist-header items-center p-2 mt-3 font-semibold text-xl ">
          <h1>Wishlist</h1>
        </div>
        <hr />
      </div>

      {isLoading && (
        <div className="w-full h-1/2 flex items-center justify-center">
          <Loader2 className="animate-spin" size={50} />
        </div>
      )}

      {isError && (
        <div className="text-center text-2xl w-full  font-bold ">
          <span className="text-red-600 block">{error?.message}</span>
        </div>
      )}

      {data?.data?.length === 0 && (
        <div className="text-center text-2xl w-full  font-bold ">
          <span className="text-red-600 text-3xl">404</span>
          <span className=" block">No item found !</span>
        </div>
      )}

      <div className="container grid grid-cols-2 p-1 gap-4 mt-4 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data && data?.data?.map((d) => <WishlistCart key={d?._id} {...d} />)}
      </div>
    </div>
  );
};

export default Wishlist;
