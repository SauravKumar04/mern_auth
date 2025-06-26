import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, inLoggedin, userData, getUserData } =
    useContext(AppContent);

  const navigate = useNavigate();
  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    inLoggedin && userData && userData.isAccountVerified && navigate("/");
  }, [inLoggedin, userData]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 sm:px-0 bg-gradient-to-br from-[#fef9f2] via-[#fff4e5] to-[#fff0dc] relative font-[Comic_Sans_MS,sans-serif]">
      <img
        onClick={() => navigate("/")}
        src="https://cdn-icons-png.flaticon.com/512/924/924915.png"
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-10 h-10 sm:w-16 sm:h-16 cursor-pointer drop-shadow-sm transition-transform hover:scale-105"
      />
      <form
        action=""
        onSubmit={onSubmitHandler}
        className="bg-[#fff8ef] border-[3px] border-[#ffdcb7] p-8 rounded-[30px] shadow-[0_8px_20px_rgba(0,0,0,0.1)] w-96 text-sm"
      >
        <h1 className="text-[#7b3f00] text-3xl font-extrabold text-center mb-4">
          ✉️ Verify Your Email
        </h1>
        <p className="text-center mb-6 text-[#aa5c00] font-medium">
          Enter the 6-digit code sent to your email 📬
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-[#ffe6cc] text-[#7b3f00] text-center text-xl font-bold rounded-xl border-[2px] border-[#ffcf9f] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#ffaa5a]"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-[#ffb26b] to-[#ff9e45] text-white font-semibold text-lg rounded-full shadow hover:shadow-md transition duration-300">
          ✅ Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
