import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContent);
  return (
    <div className="flex flex-col items-center mt-24 px-4 text-center py-14 text-[#7b3f00] font-[Comic_Sans_MS,sans-serif] bg-gradient-to-b from-[#fff9f0] via-[#fff4e2] to-[#fff1dc] rounded-b-[40px] shadow-inner shadow-[#f0d4b6] border-x border-[#ffe5c1] mx-2 sm:mx-10">
      <div className="w-80 h-62 rounded-[30px] overflow-hidden mb-6 shadow-md border-[3px] border-[#ffdcb7] bg-white">
        <img
          src={assets.header_img}
          alt="Developer working"
          className="object-cover w-full h-full"
        />
      </div>

      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-semibold mb-2">
        Hey {userData && userData.name ? userData.name : "Developer"}!
        <img src={assets.hand_wave} className="w-8 aspect-square" alt="Wave" />
      </h1>

      <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight text-[#d47800]">
        Welcome to our App 🎉
      </h2>

      <p className="mb-8 max-w-md text-[#aa5c00] sm:text-lg">
        Let’s start with a quick product tour — we’ll have you up and running in no time!
      </p>

      <button className="bg-gradient-to-r from-[#ffa75c] to-[#ff9240] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
        🌟 Get Started
      </button>
    </div>
  );
};

export default Header;
