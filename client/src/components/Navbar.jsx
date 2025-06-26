import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      data.success
        ? (toast.success(data.message), navigate("/email-verify"))
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center px-4 sm:px-24 py-2 fixed top-0 z-50 backdrop-blur-md bg-gradient-to-r from-[#fff0dc] via-[#ffe8c4] to-[#fff0dc] shadow-[0_4px_10px_rgba(0,0,0,0.05)] font-[Comic_Sans_MS,sans-serif] border-b border-[#ffdcb7]">
      <img
        src="https://cdn-icons-png.flaticon.com/512/924/924915.png"
        alt="Logo"
        onClick={() => navigate("/")}
        className="w-12 sm:w-16 drop-shadow cursor-pointer hover:scale-105 transition-transform duration-300"
      />

      {userData ? (
        <div className="relative group">
          <div className="w-9 h-9 flex justify-center items-center text-base font-bold text-white bg-[#ff9e45] rounded-full shadow-md cursor-pointer">
            {userData.name[0].toUpperCase()}
          </div>
          <div className="absolute hidden group-hover:block top-10 right-0 mt-2 z-20 bg-white border border-[#ffdcb7] rounded-lg shadow text-sm text-[#7b3f00]">
            <ul>
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="px-4 py-2 hover:bg-[#fff4e3] cursor-pointer transition"
                >
                  📧 Verify Email
                </li>
              )}
              <li
                onClick={logout}
                className="px-4 py-2 hover:bg-[#fff4e3] pr-10 cursor-pointer transition"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-[#ffdcb7] bg-white rounded-full px-5 py-1.5 text-[#aa5c00] font-semibold shadow-sm hover:shadow-md hover:bg-[#fff4e3] transition-all duration-200"
        >
          Login{" "}
          <img
            src="https://cdn-icons-png.flaticon.com/512/545/545682.png"
            alt="Arrow Icon"
            className="w-4"
          />
        </button>
      )}
    </div>
  );
};

export default Navbar;
