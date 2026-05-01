import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../components/Message";
import { Loader2 } from "lucide-react";

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    message: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { username, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password do not match!");
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const jsonData = await res.json();
      if (!res.ok) {
        toast.error(jsonData.message);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setMessage({
        message: jsonData.message,
      });
      setFormData({
        username: "",
        email: "",
        password: "",
        password2: "",
      });
      setTimeout(() => {
        setMessage({
          message: "",
        });
      }, 8000);
    } catch (err) {
      setIsLoading(false);
      setMessage({
        message: err.message,
      });
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col gap-5 justify-center items-center bg-slate-200">
        <div className="mt-10 md:mt-2">
          {isLoading && <Loader2 className="animate-spin" />}
          {message && <Message {...message} />}
        </div>
        <div className="w-full p-5 mx-5 bg-white text-center rounded-lg md:max-w-2xl">
          <h1 className="text-2xl font-semibold mb-10">
            Create an account to E-Commerce
          </h1>
          <form className="my-3 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="border flex items-center p-2 my-1 font-semibold w-ful text-xl rounded-sm">
              <MdOutlineMail className="text-2xl font-normal" />
              <input
                type="text"
                name="username"
                className="focus:outline-none px-2 py-1 w-full"
                placeholder="Full name"
                value={username}
                onChange={handleChange}
              />
            </div>
            <div className="border flex items-center p-2 my-1 font-semibold text-xl rounded-sm">
              <MdOutlineMail className="text-2xl font-normal" />
              <input
                type="email"
                name="email"
                className="focus:outline-none px-2 py-1  w-full"
                placeholder="Email..."
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="border flex items-center justify-between p-2 my-1 font-semibold text-xl rounded-sm  w-full">
              <div className="flex items-center  w-full">
                <FaLock className="text-2xl font-normal" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="focus:outline-none px-2 py-1 w-full"
                  placeholder="*********"
                  value={password}
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
            <div className="border flex items-center justify-between p-2 my-3 font-semibold text-xl rounded-sm">
              <div className="flex items-center w-full">
                <FaLock className="text-2xl font-normal" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password2"
                  className="focus:outline-none px-2 py-1  w-full"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              className={`bg-[var(--orange--color)] border w-full p-3 my-2 font-semibold text-xl rounded-3xl uppercase text-white`}
            >
              {isLoading ? "Loadin..." : "Register"}
            </button>

            <div className="flex items-center justify-center p-2 my-2 font-semibold text-xl">
              <span>
                Already have an account ?
                <Link to="/login" className="mx-5 text-[var(--orange--color)]">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
