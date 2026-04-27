import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ItemCard = ({
  type,
  name,
  discountedPrice,
  img,
  price,
  productId,
  discountPercent,
  description,
  avgReview,
}) => {
  return (
    <>
      <div className="item-cart p-3 border border-slate-300 rounded-lg bg-white dark:bg-slate-800 flex flex-col justify-between dark:border-none">
        <Link to={`/product/${productId}`}>
          <div className="cart-img max-h-40 w-full overflow-hidden">
            <img
              src={`${import.meta.env.VITE_API_URL}${img}`}
              alt=""
              className="max-h-40 w-full "
            />
          </div>
        </Link>
        <div className="cart-body my-1 ">
          <h3 className="font-bold line-clamp-1 dark:text-slate-400">{name}</h3>
          <div className="reviews line-clamp-1 my-1 text-md text-gray-500 sm:text-lg sm:items-center sm:gap-2">
            {description}
          </div>
          {type === "top" && (
            <div className="stars flex gap-1 ">
              {Array.from({ length: avgReview }).map((_, index) => (
                <FaStar
                  className="text-(--light-red--color) dark:text-(--orange--color)"
                  key={index}
                />
              ))}
            </div>
          )}
          <div className="flex justify-between items-center h-6">
            {type === "all" &&
              (discountPercent > 0 ? (
                <>
                  <h3 className="text-lg text-gray-400 font-semibold dark:text-slate-400 line-through">
                    ${price}
                  </h3>
                  <h3 className="text-lg text-red-600 font-semibold dark:text-slate-400">
                    ${discountedPrice}
                  </h3>
                </>
              ) : (
                <h3 className="text-lg font-semibold dark:text-slate-400">
                  ${price}
                </h3>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
