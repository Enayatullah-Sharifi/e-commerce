import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomeScreen from "./screens/HomeScreen";
import WishlistScreen from "./screens/WishlistScreen";
import CartScreen from "./screens/CartScreen";
// import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CartDetail from "./screens/CartDetail";
import DashboardScreen from "./screens/DashboardScreen";
import ForgotPasswrod from "./screens/ForgotPasswrod";
import ResetPassword from "./screens/ResetPassword";
import OrderScreen from "./screens/OrdersScreen";
import ProductScreen from "./screens/ProductsScreen";

import { useSelector } from "react-redux";
import UsersScreen from "./screens/UsersScreen";
// import NewScreen from "./screens/NewScreen";

import UserOrdersScreen from "./screens/UserOrdersScreen";
import Checkout from "./screens/Success";
import Cancel from "./screens/Cancel";
import Success from "./screens/Success";
import AddDiscountScreen from "./screens/addDiscountScreen";
import DashboardLayout from "./dashboardComponents/DashboardLayout";
import AdminRoute from "./components/AdminRoute";

const App = () => {
  const { darkMode } = useSelector((state) => state?.theme);

  return (
    <div className={`${darkMode && "dark"} `}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/wishlist" element={<WishlistScreen />} />
          <Route path="/product/:id" element={<CartDetail />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          <Route path="/forgotpassword" element={<ForgotPasswrod />} />
          <Route
            path="/forgotpassword/:resetToken"
            element={<ResetPassword />}
          />

          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="/userOrders" element={<UserOrdersScreen />} />
              <Route index element={<DashboardScreen />} />
              <Route path="orders" element={<OrderScreen />} />
              <Route path="customers" element={<UsersScreen />} />
              <Route path="products" element={<ProductScreen />} />
              <Route path="discount" element={<AddDiscountScreen />} />
            </Route>
          </Route>

          {/* <Route path="/new" element={<NewScreen />} /> */}
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/success" element={<Success />} />
          <Route path="/checkout-process" element={<Checkout />} />
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
};

export default App;
