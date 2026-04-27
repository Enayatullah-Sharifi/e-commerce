import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/wishlist";
const WishlistCart = ({ _id, productId }) => {
  const queryClient = useQueryClient();

  const { _id: pId, name, description, img } = productId;

  const mutation = useMutation({
    mutationFn: ({ _id }) => deleteProduct(_id),
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      if (variable.showNotification) {
        toast.success(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return (
    <div>
      {/* cart */}
      <div className="item-cart pt-6 pb-2 px-2 border rounded-lg relative shadow-md  hover:border-(--dark-red--color) hover:scale-101 flex flex-col justify-between max-h-80 max-w-64 dark:bg-slate-800 dark:hover:border-(--orange--color)">
        {/* Delete Button */}
        <div
          onClick={() => mutation.mutate({ _id, showNotification: true })}
          className="absolute top-2 right-2 text-white bg-(--orange--color) rounded-full p-1 cursor-pointer hover:bg-(--dark-red--color) "
        >
          <FaTimes size={15} className="text-gray-950" />
        </div>

        {/* Image */}
        <div className="max-h-40 h-36 w-full">
          <Link to={`/product/${pId}`}>
            <img
              src={`${import.meta.env.VITE_API_URL}${img}`}
              alt=""
              className="max-h-full w-full"
            />
          </Link>
        </div>

        {/* Cart body */}
        <div className="cart-body my-1 ">
          <h3 className="font-bold dark:text-white/80">{name}</h3>
          <p className="line-clamp-1 ">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default WishlistCart;
