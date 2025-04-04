"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ConnectWallet from "@/components/ui/ConnectWallet";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full py-4 px-4 md:px-8 z-50 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative group">
            <div className="w-32 h-10 bg-[#00f3ff] flex items-center justify-center rounded-md font-bold text-black group-hover:bg-[#bc00ff] group-hover:shadow-[#bc00ff] transition-all duration-300 group-hover:text-white">
              HIGHER
            </div>
            <div className="absolute inset-0 bg-[#00f3ff] rounded-md opacity-30 group-hover:opacity-50 blur-sm group-hover:bg-[#bc00ff] transition-colors duration-300"></div>
          </div>
        </Link>


        {/* Wallet Connect Button */}
        <div className="hidden md:block">
          <ConnectWallet />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-[#00f3ff]/20 border-b border-[#00f3ff]/20"
          >
            <div className="flex flex-col p-6 space-y-4">
              {["Features", "Protocols", "Docs", "Community"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white hover:text-[#00f3ff] py-2 text-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="pt-4">
                <ConnectWallet />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative text-white font-medium hover:text-[#00f3ff] transition-colors duration-300 group",
        className
      )}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00f3ff] to-[#bc00ff] group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}
