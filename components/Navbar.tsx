import React from "react";
import ConnectWallet from "./ui/ConnectWallet"; 

const Navbar = () => {
  return (
    <nav className="flex justify-center bg-slate-900 w-full pt-4">
      <div className="w-full px-6 flex justify-between items-center mx-auto">
        <h1 className="font-medium text-white/60 text-3xl">
          H<span className="font-bold text-purple-500">i</span>gher
        </h1>
        <div className="flex gap-2">
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
