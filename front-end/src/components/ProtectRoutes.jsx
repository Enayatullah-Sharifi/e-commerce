import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  // not logged in
  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectRoutes;
