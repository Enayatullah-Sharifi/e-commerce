import API from "./base";
import { useState } from "react";
import {
  FaCartPlus,
  FaChartBar,
  FaHeart,
  FaList,
  FaMoon,
  FaSignInAlt,
  FaSignOutAlt,
  FaSun,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { darkModeToggle } from "../redux/features/themeSlice";
import {
  logoutSuccess,
  logoutStart,
  logoutFailure,
} from "../redux/features/authSlice";

import Swal from "sweetalert2";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [profileDropDown, setProfileDropDown] = useState(false);
  const { darkMode } = useSelector((state) => state.theme);

  const navigate = useNavigate();

  const toggleTheme = () => {
    dispatch(darkModeToggle(!darkMode));
  };
  const openProfileDropDown = () => {
    setProfileDropDown(!profileDropDown);
  };

  // Handle logout
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure, you want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
    });

    if (!result.isConfirmed) return;

    dispatch(logoutStart());
    try {
      const jsonData = await fetch(`${API}/api/auth/logout`);
      if (jsonData.ok) {
        dispatch(logoutSuccess());
        navigate("/");
      }
    } catch (err) {
      dispatch(logoutFailure(err));
      console.log(err);
    }
  };

  return (
    <div className="fixed w-full top-2 px-2 md:px-7 z-50 ">
      <div className="bg-white py-1 rounded-full flex justify-between items-center px-3 shadow-lg dark:bg-slate-800">
        <div className="flex gap-2 text-lg">
          <Link to="/wishlist" title="wish list">
            <FaHeart className="text-[var(--light-red--color)] dark:text-white/80" />
          </Link>
          <Link to="/cart" title="cart" className="flex">
            <FaCartPlus className="text-slate-500 dark:text-white/80" />
            {cartItems?.length > 0 && (
              <span className="bg-green-600 rounded-full w-4 h-4 text-xs text-center ">
                {cartItems.reduce((a, c) => a + Number(c.qty), 0)}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div>
            {darkMode ? (
              <FaMoon
                className="w-5 h-5 rounded-full shadow-lg dark:text-white/80"
                onClick={() => toggleTheme(!darkMode)}
              />
            ) : (
              <FaSun
                className="w-6 h-6 rounded-full shadow-lg text-slate-600"
                onClick={() => toggleTheme(!darkMode)}
              />
            )}
          </div>

          {userInfo ? (
            <>
              <div className="dark:bg-white rounded-full p-[2px]">
                <img
                  src={userInfo?.img}
                  className="w-6 h-6 rounded-full"
                  onClick={openProfileDropDown}
                />
              </div>
              {profileDropDown && (
                <div className="flex flex-col bg-white px-4 py-2 capitalize gap-2 text-black absolute right-5 top-10 dark:bg-slate-700 dark:text-white">
                  {userInfo.role === "admin" && (
                    <Link
                      to={`/dashboard`}
                      className="flex gap-2 items-center hover:scale-105"
                    >
                      <FaChartBar />
                      Dashboard
                    </Link>
                  )}
                  {userInfo.role !== "admin" && (
                    <Link
                      to={`/userOrders`}
                      className="flex gap-2 items-center hover:scale-105"
                    >
                      <FaList />
                      Orders
                    </Link>
                  )}
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:scale-105"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                    Logout
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="text-lg">
              <FaSignInAlt className="text-slate-600 dark:text-white/80" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
