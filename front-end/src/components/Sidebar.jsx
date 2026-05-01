import API from "../api/base";
import {
  FaBook,
  FaBox,
  FaChartBar,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

import { useNavigate, NavLink } from "react-router-dom";

import Swal from "sweetalert2";
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "../redux/features/authSlice";
import { useDispatch } from "react-redux";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `px-2 py-2 rounded-md  text-slate-950 transition-colors duration-200 flex gap-4 items-center text-xl  ${
          isActive
            ? "bg-red-800 text-white font-semibold dark:bg-yellow-300 dark:text-slate-950"
            : "bg-white text-slate-950 font-semibold dark:bg-slate-800 dark:text-white"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

const Sidebar = ({ closeSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    closeSidebar();
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
      const jsonData = await fetch(`${API}/api/auth/logout`, {
        method: "GET",
        credentials: "include", // ✅ REQUIRED
      });
      if (jsonData.ok) {
        dispatch(logoutSuccess());

        navigate("../");
      }
    } catch (err) {
      dispatch(logoutFailure(err));
      console.log(err);
    }
  };

  return (
    <div className="p-3 flex gap-2 flex-col z-50 h-screen dark:bg-slate-900">
      {/* Link */}
      <NavItem
        to="/dashboard"
        className="bg-white rounded-e-lg grid grid-cols-11 gap-3 w-full items-center  text-2xl px-2 py-1 dark:bg-slate-800"
      >
        <div className="bg-slate-500 p-2 rounded-lg text-white col-span-3 ">
          <FaChartBar />
        </div>
        <div className="col-span-8">Dashboard</div>
      </NavItem>

      {/* Link */}
      <NavItem
        to="/dashboard/customers"
        className="bg-white rounded-e-lg grid grid-cols-11 gap-3 w-full items-center  text-2xl px-2 py-1 dark:bg-slate-800"
      >
        <div className="bg-black p-2 rounded-lg text-white col-span-3">
          <FaUsers />
        </div>
        <div className="col-span-8">Customer</div>
      </NavItem>

      {/* NavItem */}
      <NavItem
        to="/dashboard/products"
        className="bg-white rounded-e-lg grid grid-cols-11 gap-3 w-full items-center  text-2xl px-2 py-1 dark:bg-slate-800"
      >
        <div className="bg-[#ed9e59] p-2 rounded-lg text-black col-span-3">
          <FaBox />
        </div>
        <div className="col-span-8">Products</div>
      </NavItem>

      {/* NavItem */}
      <NavItem
        to="/dashboard/orders"
        className="bg-white rounded-e-lg grid grid-cols-11 gap-3 w-full items-center  text-2xl px-2 py-1 dark:bg-slate-800"
      >
        <div className="bg-[#a34054] p-2 rounded-lg text-white col-span-3 ">
          <FaBook />
        </div>
        <div className="col-span-8">Orders</div>
      </NavItem>

      {/* NavItem */}
      <div
        onClick={handleLogout}
        className=" bg-white rounded-e-lg grid grid-cols-11 gap-3 w-full items-center  text-2xl px-2 py-1 cursor-pointer dark:bg-slate-800"
      >
        <div className="bg-red-900 p-2 rounded-lg text-white col-span-3">
          <FaSignOutAlt />
        </div>
        <div className="col-span-8 dark:text-white">Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
