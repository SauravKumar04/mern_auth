import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const endpoint = state === "Sign Up" ? "/register" : "/login";
      const payload =
        state === "Sign Up" ? { name, email, password } : { email, password };

      const { data } = await axios.post(
        backendUrl + "/api/auth" + endpoint,
        payload
      );

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 sm:px-0 bg-gradient-to-br from-[#fffdf7] via-[#fff4e0] to-[#fff0dc] relative font-[Comic_Sans_MS,sans-serif]">
      <img
        onClick={() => navigate("/")}
        src="https://cdn-icons-png.flaticon.com/512/924/924915.png"
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-10 h-10 sm:w-16 sm:h-16 cursor-pointer drop-shadow-sm transition-transform hover:scale-105"
      />

      <div className="bg-[#ffffffdd] backdrop-blur-xl border border-[#ffdcb7] rounded-[30px] px-8 py-10 w-full max-w-md text-center shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#7b3f00] mb-2">
          {state === "Sign Up" ? "Create Account" : "Welcome Back!"}
        </h2>
        <p className="text-[#aa5c00] text-sm sm:text-base mb-6">
          {state === "Sign Up"
            ? "Let’s get you started 🚀"
            : "Login to continue ✨"}
        </p>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {state === "Sign Up" && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#fffaf3] shadow-inner border border-[#ffe8c4]">
              <img src={assets.person_icon} alt="Name" className="w-5" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full name"
                className="flex-1 bg-transparent outline-none text-[#7b3f00] text-sm"
                required
              />
            </div>
          )}

          <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#fffaf3] shadow-inner border border-[#ffe8c4]">
            <img src={assets.mail_icon} alt="Email" className="w-5" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className="flex-1 bg-transparent outline-none text-[#7b3f00] text-sm"
              required
            />
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#fffaf3] shadow-inner border border-[#ffe8c4]">
            <img src={assets.lock_icon} alt="Password" className="w-5" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="flex-1 bg-transparent outline-none text-[#7b3f00] text-sm"
              required
            />
          </div>

          <p
            className="mb-2 text-sm text-[#d47800] cursor-pointer hover:underline"
            onClick={() => navigate("/reset-password")}
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-full bg-gradient-to-r from-[#ffa75c] to-[#ff9240] text-white font-bold hover:brightness-110 transition-all"
          >
            {state === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-6 text-sm text-[#8c4f00]">
          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                className="text-[#d47800] cursor-pointer hover:underline font-semibold"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <span
                className="text-[#d47800] cursor-pointer hover:underline font-semibold"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
