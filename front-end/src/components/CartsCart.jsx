import { FaTimes } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CartsCart = (c) => {
  const {
    name,
    img,
    realPrice,
    discountedPrice,
    discountPercent,
    price,
    qty,
    _id,
    totalQtyInStock,
  } = c.props;
  const dispatch = useDispatch();

  const changeQty = (e) => {
    dispatch(addToCart({ ...c.props, qty: Number(e.target.value) }));
  };

  const removeItemHandler = () => {
    dispatch(removeFromCart({ _id }));
    toast.info("Item removed successfully!");
  };

  return (
    <>
      <div className="flex gap-3 md:gap-5 items-center border w-full p-1 rounded-sm relative  shadow-lg dark:bg-slate-800 dark:text-white/60">
        <img
          className="w-24 h-32 md:w-40 md:h-40"
          src={img}
          alt=""
        />
        <div>
          <h3>{name}</h3>
          <p>
            {discountPercent > 0 ? (
              <>
                Price: 
                <span>$ {discountedPrice}</span>
              </>
            ) : (
              <>
                Price: <span>${price}</span>
              </>
            )}
          </p>
          <p>
            Qty:
            <select
              className=" p-2 dark:bg-slate-700 focus:outline-none dark:text-white/60"
              value={qty}
              onChange={changeQty}
            >
              {[...Array(totalQtyInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </p>
        </div>

        <FaTimes
          className="absolute top-3 right-3"
          onClick={removeItemHandler}
        />
      </div>
    </>
  );
};

export default CartsCart;
