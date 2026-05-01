import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { addToCart } from "../redux/features/cartSlice";
import ReviewCart from "../components/ReviewCart";
import { Loader, Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById } from "../api/getProduct";
import { createReview, getReviews } from "../api/reviews";
import { addProductToWishlist } from "../api/wishlist";

function CartDetail() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [qty, setQty] = useState(1);
  const [review, setReview] = useState({ review: "" });

  const { id } = useParams();

  // query to get a single product
  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: getProductById,
    staleTime: 5 * 60 * 1000,
  });

  // get reviews with product ID
  const { data: reviewsList = {}, isLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: ({ signal, queryKey }) => {
      const [, id] = queryKey;
      return getReviews({ signal }, id);
    },
    staleTime: Infinity,
  });
  const { avgReviews, count, reviews } = reviewsList;

  // Add product to wishlist
  const { mutate: wishlistMutate } = useMutation({
    mutationFn: (id) => addProductToWishlist(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["wishlist"]);
      toast.success(data?.message);
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const addToWishListHandler = async (id) => {
    if (!userInfo) {
      toast.error("Please login first to add item to wishlist");
      navigate("/login");
      return;
    }
    wishlistMutate(id);
  };

  // Add reviews to a product
  const {
    mutate,
    isLoading: createReviewIsLoading,
    isError: createReviewIsError,
    error: createReviewError,
  } = useMutation({
    mutationFn: () => createReview(id, review),
    onSuccess: (data) => {
      toast.success(data && "Review added successfully!");
      queryClient.invalidateQueries({
        queryKey: ["reviews", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["topProducts"],
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const reviewSubmitHandler = async (e) => {
    e.preventDefault();
    if (review.review === "") {
      toast.info("Please choose a review and submit");
      return;
    }

    await mutate(id, review);
  };

  const changeQty = (e) => {
    setQty(Number(e.target.value));
  };
  const addToCartHandler = () => {
    dispatch(addToCart({ ...data, qty, totalQtyInStock: data?.qty }));
    navigate("/cart");
  };

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top-left corner
  }, []);

  return (
    <div className="dark:bg-slate-900 p-5">
      <div className="container mx-auto min-h-100dvh">
        <Link
          to="/"
          className="bg-(--dark-red--color) text-white px-3 py-1 rounded-sm mx-5 md:mx-10 dark:text-white/70"
        >
          Go Back
        </Link>

        <div className="container grid md:grid-cols-7">
          {/* Item image */}
          <div className="p-3 md:col-span-4">
            <div className="flex items-center justify-center relative group">
              <img className="max-h-96 md:max-w-md" src={data?.img} alt="" />

              {/* <span
                className="absolute right-10 bottom-5 px-5 py-1 bg-(--dark-red--color) text-white flex items-center gap-4 rounded-sm cursor-pointer opacity-0 translate-y-3 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out delay-100
      hover:scale-105 active:scale-95
    "
                onClick={() => addToWishListHandler(data?._id)}
              >
                Add to Wishlist <FaHeart size={24} />
              </span> */}

              <div className="absolute top-2 right-2 z-10">
                {/* ❤️ Mobile: icon only */}
                <button
                  onClick={() => addToWishListHandler(data?._id)}
                  className="
      flex items-center justify-center
      bg-white/90 backdrop-blur
      p-2 rounded-full shadow
      md:hidden
      active:scale-95
    "
                >
                  <FaHeart size={18} />
                </button>

                {/* 💻 Desktop: hover button */}
                <span
                  className="
      hidden md:flex
      absolute right-0 top-8
      px-5 py-1 bg-(--dark-red--color) text-white
      items-center gap-4 rounded-sm cursor-pointer
      
      opacity-0 translate-y-3 scale-95
      group-hover:opacity-100 
      group-hover:translate-y-0 
      group-hover:scale-100
      
      transition-all duration-300 ease-out
    "
                  onClick={() => addToWishListHandler(data?._id)}
                >
                  Add to Wishlist <FaHeart size={18} />
                </span>
              </div>
            </div>

            <h2 className="bg-slate-300 p-2 my-5 dark:text-white/70 dark:bg-slate-800 ">
              <span>Reviews</span>
            </h2>

            {isLoading ? (
              <Loader2 className="animate-spin w-full text-center my-5 dark:text-white" />
            ) : reviews?.length > 0 ? (
              <div className="h-40 overflow-y-scroll p-5 flex flex-col gap-3">
                {reviews?.map((review) => (
                  <ReviewCart {...review} key={review._id} />
                ))}
              </div>
            ) : (
              <h1 className="p-2 text-lg font-semibold text-red-500 dark:text-white">
                No Reviews
              </h1>
            )}

            <hr />
            {/* Review Form */}
            <form onSubmit={reviewSubmitHandler}>
              <div className="flex flex-col  dark:text-white/70">
                <select
                  className="p-3 border focus:outline-none dark:bg-slate-800 dark:text-white/70"
                  onChange={(e) => setReview({ review: e.target.value })}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>

                <button
                  className="bg-[var(--dark-red--color)] my-2 p-2 uppercase text-white font-semibold rounded-sm cursor-pointer flex items-center justify-center dark:text-white/80"
                  disabled={isLoading}
                >
                  {createReviewIsLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Add Review"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className=" p-3 md:col-span-3 lg:flex">
            {/* Item Detail */}
            <div className="p-1 flex-1">
              <h3 className="dark:text-white/70">{data?.name}</h3>
              <hr />
              <div className="reviews my-2 flex items-center gap-3 text-md text-gray-500  sm:text-lg">
                {!avgReviews?.length ? (
                  <h1>No Reviews</h1>
                ) : (
                  <div className="stars flex gap-1 ">
                    {avgReviews?.map((r) => (
                      <FaStar className="text-yellow-500 " key={r} />
                    ))}
                  </div>
                )}

                <p className="dark:text-white/40 flex gap-1">
                  <span>{!reviews?.length ? "" : `${count} Reviews`}</span>
                </p>
              </div>
              <hr />
              <h3 className="text-lg font-semibold py-0 dark:text-white/70">
                {data?.discountPercent > 0 ? (
                  <>
                    Price :
                    <span className="line-through text-gray-400">
                      $ {data?.realPrice}
                    </span>
                    <span className=" text-red-600 mx-4">
                      $ {data?.discountedPrice}
                    </span>
                  </>
                ) : (
                  <span>Price: {data?.realPrice}</span>
                )}
              </h3>

              <hr />
              <p className=" p-1 dark:text-white/60 max-h-60 overflow-y-auto">
                {data?.description}
              </p>
              <hr />
            </div>

            {/* Add to cart form */}
            <div className="flex-1 flex flex-col p-3 dark:text-white/70 my-10">
              <div className="font-semibold py-2 ">
                {data?.discountPercent > 0 ? (
                  <>
                    Price :
                    <span className="line-through text-gray-400">
                      $ {data?.realPrice}
                    </span>
                    <span className=" text-red-600 mx-4">
                      $ {data?.discountedPrice}
                    </span>
                  </>
                ) : (
                  <span>Price: {data?.realPrice}</span>
                )}
              </div>
              <hr />
              <div className="flex gap-3  justify-between font-semibold py-2 md:mx-1 ">
                <h2>Status:</h2>
                <p>In Stock</p>
                <p>Count in Stock {data?.qty}</p>
              </div>
              <hr />
              <div className="flex gap-3 justify-between items-center font-semibold py-2">
                Qty:
                <select
                  className="border py-2 px-3 focus:outline-none dark:bg-slate-800 dark:text-white/70"
                  onChange={changeQty}
                >
                  {[...Array(data?.qty).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="bg-(--dark-red--color) text-white p-1 m-2 hover:opacity-80 dark:text-white/70"
                onClick={addToCartHandler}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDetail;
