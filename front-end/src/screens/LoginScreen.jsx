import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/features/authSlice";
import { Loader2 } from "lucide-react";

const LoginScreen = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const jsonData = await res.json();

      if (!res.ok) {
        dispatch(loginFailure(jsonData.message));
        toast.error(jsonData.message);
        return;
      }
      if (jsonData.success === true) {
        dispatch(loginSuccess(jsonData.data));
        navigate("/");
        return;
      }
      toast.success(jsonData.message);
    } catch (err) {
      dispatch(loginFailure());
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="w-full h-[92vh] flex flex-col gap-3 justify-center items-center bg-slate-200">
        {isLoading && <Loader2 className="animate-spin" />}
        <div className="w-full px-5 py-5 mx-5 bg-white text-center rounded-lg md:max-w-2xl">
          <h1 className="text-2xl font-semibold mb-10">Login to E-Commerce</h1>
          <form className="my-10" onSubmit={handleSubmit}>
            <div className="border flex items-center p-2 my-3 font-semibold text-xl rounded-sm">
              <MdOutlineMail className="text-2xl font-normal" />
              <input
                type="email"
                name="email"
                className="focus:outline-none px-2 py-1  w-full"
                placeholder="Email..."
                value={email}
                required
                onChange={handleChange}
              />
            </div>
            <div className="border flex items-center justify-between p-2 my-3 font-semibold text-xl rounded-sm">
              <div className="flex items-center  w-full">
                <FaLock className="text-2xl font-normal" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="focus:outline-none px-2 py-1  w-full"
                  placeholder="*********"
                  value={password}
                  required
                  onChange={handleChange}
                />
              </div>
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FaEyeSlash className="text-slate-400" />
                ) : (
                  <FaEye className="text-slate-400" />
                )}
              </div>
            </div>
            <div className="p-2 my-1 font-semibold text-xl">
              <Link
                to="/forgotpassword"
                className="mx-5 text-[var(--orange--color)]"
              >
                Forgot password
              </Link>
            </div>

            <button
              disabled={isLoading}
              className="bg-[var(--orange--color)] border w-full p-3 my-4 font-semibold text-xl rounded-3xl uppercase text-white"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>

            <div className="flex items-center justify-center p-2 my-3 font-semibold text-xl">
              <span>
                Don't have an account ?
                <Link
                  to="/register"
                  className="mx-5 text-[var(--orange--color)]"
                >
                  Register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
