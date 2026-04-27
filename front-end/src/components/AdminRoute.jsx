import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
   
  // not logged in
  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // logged in but NOT admin
  if (!userInfo?.role === 'admin') {
    return <Navigate to="/" replace />;
  }

  // ✅ admin allowed
  return <Outlet />;
};

export default AdminRoute;