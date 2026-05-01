import API from "../api/base";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState({ password: "" });
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/auth/forgotpassword/${resetToken}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(password),
      });
      const jsonData = await res.json();
      if (!res.ok) {
        toast.error(jsonData.message);
        return;
      }
      toast.success(jsonData.message);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="bg-slate-200 w-full h-screen flex items-center justify-center flex-col gap-5 p-2">
        <h1 className="font-bold text-2xl">New Password</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col w-full p-5 rounded-sm gap-4 sm:w-1/2"
        >
          <input
            type="text"
            placeholder="New Password"
            className="px-4 py-2 border focus:outline-none font-semibold text-lg"
            value={password.password}
            onChange={(e) => setPassword({ password: e.target.value })}
          />
          <button className="bg-[var(--orange--color)] py-2 rounded-sm font-semibold uppercase">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
