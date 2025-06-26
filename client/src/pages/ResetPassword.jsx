import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/send-reset-otp", { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 sm:px-0 bg-gradient-to-br from-[#fef9f2] via-[#fff4e5] to-[#fff0dc] relative font-[Comic_Sans_MS,sans-serif]">
      <img
        onClick={() => navigate("/")}
        src="https://cdn-icons-png.flaticon.com/512/924/924915.png"
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-10 h-10 sm:w-16 sm:h-16 cursor-pointer drop-shadow-sm transition-transform hover:scale-105"
      />

      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-[#fff8ef] border-[3px] border-[#ffdcb7] p-8 rounded-[30px] shadow-lg w-96 text-sm"
        >
          <h1 className="text-[#7b3f00] text-2xl font-extrabold text-center mb-4">🔐 Reset Password</h1>
          <p className="text-center mb-6 text-[#aa5c00] font-medium">
            Enter your registered email 📧
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#ffe6cc] border border-[#ffcf9f]">
            <img src={assets.mail_icon} alt="" className="w-4 h-4" />
            <input
              type="email"
              placeholder="Email ID"
              className="bg-transparent outline-none text-[#7b3f00] w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-[#ffb26b] to-[#ff9e45] text-white font-semibold text-lg rounded-full shadow hover:shadow-md transition duration-300">
            🚀 Send OTP
          </button>
        </form>
      )}

      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-[#fff8ef] border-[3px] border-[#ffdcb7] p-8 rounded-[30px] shadow-lg w-96 text-sm"
        >
          <h1 className="text-[#7b3f00] text-2xl font-extrabold text-center mb-4">
            ✉️ Enter OTP
          </h1>
          <p className="text-center mb-6 text-[#aa5c00] font-medium">
            Check your inbox for the 6-digit code 💌
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  required
                  className="w-12 h-12 bg-[#ffe6cc] text-[#7b3f00] text-center text-xl font-bold rounded-xl border-[2px] border-[#ffcf9f] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#ffaa5a]"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-[#ffb26b] to-[#ff9e45] text-white font-semibold text-lg rounded-full shadow hover:shadow-md transition duration-300">
            Submit OTP
          </button>
        </form>
      )}

      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-[#fff8ef] border-[3px] border-[#ffdcb7] p-8 rounded-[30px] shadow-lg w-96 text-sm"
        >
          <h1 className="text-[#7b3f00] text-2xl font-extrabold text-center mb-4">
            🔒 New Password
          </h1>
          <p className="text-center mb-6 text-[#aa5c00] font-medium">
            Set your new password 🔑
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#ffe6cc] border border-[#ffcf9f]">
            <img src={assets.lock_icon} alt="" className="w-4 h-4" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none text-[#7b3f00] w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-[#ffb26b] to-[#ff9e45] text-white font-semibold text-lg rounded-full shadow hover:shadow-md transition duration-300">
            🔓 Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
