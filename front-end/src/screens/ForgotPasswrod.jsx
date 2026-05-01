import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'

const ForgotPasswrod = () => {
    const [email, setEmail] = useState({email: ''})
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch(`${API}/api/auth/forgotpassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(email),
          });
          const jsonData = await res.json();
    
          if (!res.ok) {
            toast.error(jsonData.message);
            return;
          }
         
          toast.success(jsonData.message);
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        }
      };
  return (
    <>
      <div className="max-w-full h-screen bg-slate-200 flex flex-col items-center px-2 justify-center">
        <div className="flex flex-col gap-5 bg-white mx-auto p-5 w-full md:w-1/2">
          <h1 className="text-xl">
            You forgot your password? Here you can easily retrieve a new
            password.
          </h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className=" border border-slate-600 flex items-center px-5 py-2 rounded-sm">
              <input
                type="email"
                name="email"
                className=" focus:outline-none w-full"
                placeholder="Email"
                value={email.email}
                onChange={(e) => setEmail({email: e.target.value})}
              />
              <MdOutlineMail className="text-2xl font-normal" />
            </div>
            <button type='submit' className="bg-[var(--orange--color)] text-dark font-semibold px-5 py-2 rounded-sm my-5">
              Request new password
            </button>
          </form>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswrod;
