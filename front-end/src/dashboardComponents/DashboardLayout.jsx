import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo || !userInfo?.role === 'admin') {
    return <Navigate to="/" replace />;
  }

  const [sideBar, setSideBar] = useState(false);
  const location = useLocation();

  const closeSidebar = () => setSideBar(false);
  const toggleSidebar = () => setSideBar((prev) => !prev);
  // 🔥 CLOSE SIDEBAR ON ROUTE CHANGE
  useEffect(() => {
    setSideBar(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-300 dark:bg-slate-900 relative">
      {/* Overlay */}
      {sideBar && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
          onClick={() => setSideBar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-56 bg-slate-400 z-[9999]
        transform transition-transform duration-300 ease-in-out
        ${sideBar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar closeSidebar={closeSidebar} />
      </div>

      {/* Header */}
      <div className="px-4 py-2 fixed w-full top-0 z-40">
        <DashboardHeader toggleSideBar={toggleSidebar} />
      </div>

      {/* Content */}
      <div className="pt-1 px-3 md:px-8 relative z-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
