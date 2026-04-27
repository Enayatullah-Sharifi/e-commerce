import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { darkModeToggle } from "../redux/features/themeSlice";

const DashboardHeader = ({ toggleSideBar }) => {
  const { darkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <div className="bg-white py-2 rounded-full shadow-md flex justify-between items-center px-3 dark:bg-slate-800 dark:text-white">

      {/* Sidebar Toggle */}
      <FaBars onClick={toggleSideBar} size={20} className="cursor-pointer" />

      {/* Theme Toggle */}
      <div>
        {darkMode ? (
          <FaMoon
            className="w-5 h-5 cursor-pointer"
            onClick={() => dispatch(darkModeToggle(false))}
          />
        ) : (
          <FaSun
            className="w-6 h-6 cursor-pointer"
            onClick={() => dispatch(darkModeToggle(true))}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;