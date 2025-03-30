"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, DiscIcon as Discord } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Glowing border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-[#00f3ff] flex items-center justify-center rounded-md font-bold text-black mr-2">
                W3
              </div>
              <span className="text-white font-bold text-lg">DecentraHub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Building the infrastructure for the decentralized web. Empowering
              users with trustless protocols and applications.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#00f3ff] transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#00f3ff] transition-colors"
              >
                <Discord size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#00f3ff] transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Protocol */}
          <div>
            <h3 className="text-white font-semibold mb-4">Protocol</h3>
            <ul className="space-y-2">
              {[
                "Documentation",
                "Developers",
                "Governance",
                "Security",
                "Audits",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#00f3ff] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {["Blog", "Tutorials", "FAQ", "Community", "Grants"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-[#00f3ff] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and
              announcements.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter your email"
                className="bg-black/40 border-white/10 focus:border-[#bc00ff] focus:ring-[#bc00ff]"
              />
              <Button className="bg-[#bc00ff] hover:bg-[#bc00ff]/80 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} DecentraHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="#"
              className="text-gray-500 hover:text-[#00f3ff] text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-[#00f3ff] text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-[#00f3ff] text-sm transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
