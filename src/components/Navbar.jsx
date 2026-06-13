'use client'

import { authClient } from "@/lib/auth-client";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CiHome } from "react-icons/ci";
import { FaComments, FaLightbulb } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { HiOutlineLightBulb } from "react-icons/hi";

const Navbar = () => {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);

  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      <div className="flex justify-between items-center px-20 p-5 shadow-xl">

        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="text-3xl">💡</div>
            <div className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
              <span className="text-green-400">Idea</span>
              <span className="text-green-600">Vault</span>
            </div>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">

          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-1 rounded-md transition
            ${pathName === "/" ? "border-2 border-green-300 bg-lime-200" : "hover:bg-gray-100"}`}
          >
            <CiHome />
            Home
          </Link>

          <Link
            href="/ideas"
            className={`flex items-center gap-2 px-3 py-1 rounded-md transition
            ${pathName === "/ideas" ? "border-2 border-green-300 bg-lime-200" : "hover:bg-gray-100"}`}
          >
            <HiOutlineLightBulb />
            Ideas
          </Link>

          {session?.user && (
            <>
              <Link
                href="/ad-Idea"
                className={`flex items-center gap-2 px-3 py-1 rounded-md transition
                ${pathName === "/ad-Idea" ? "border-2 border-green-300 bg-lime-200" : "hover:bg-gray-100"}`}
              >
                <GoPlus />
                Add Idea
              </Link>

              <Link
                href="/myideas"
                className={`flex items-center gap-2 px-3 py-1 rounded-md transition
                ${pathName === "/myideas" ? "border-2 border-green-300 bg-lime-200" : "hover:bg-gray-100"}`}
              >
                <FaLightbulb />
                My Ideas
              </Link>

              <Link
                href="/my-interactions"
                className={`flex items-center gap-2 px-3 py-1 rounded-md transition
                ${pathName === "/my-interactions" ? "border-2 border-green-300 bg-lime-200" : "hover:bg-gray-100"}`}
              >
                <FaComments />
                My Interactions
              </Link>
            </>
          )}

        </div>

        {/* Auth Section */}
        <div className="flex gap-2 items-center">

          {session?.user ? (
            <div className="relative">

              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2 hover:bg-gray-50"
              >
                <img
                  src={session.user.image || "/user.png"}
                  alt={session.user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-green-400"
                />

                <div className="hidden md:block text-left">
                  <h3 className="font-semibold text-sm">
                    {session.user.name}
                  </h3>
                </div>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-60 rounded-xl bg-white shadow-xl border z-50 overflow-hidden">

                  <div className="p-4 border-b">
                    <Image
                    width={14}
                    height={14}
                      src={session.user.image || "/user.png"}
                      alt={session.user.name}
                      className="w-14 h-14 rounded-full mx-auto border"
                    />

                    <h3 className="text-center font-semibold mt-2">
                      {session.user.name}
                    </h3>

                    <p className="text-center text-xs text-gray-500">
                      {session.user.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    href="/myideas"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    My Ideas
                  </Link>

                  <Link
                    href="/my-interactions"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    My Interactions
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300 flex items-center justify-center bg-[linear-gradient(to_bottom_right,_#2e8eff_0%,_rgba(46,142,255,0)_30%)] bg-[rgba(46,142,255,0.2)] hover:bg-[rgba(46,142,255,0.7)] hover:shadow-[0_0_10px_rgba(46,142,255,0.5)]"
              >
                <div className="w-[127px] h-[47px] rounded-[13px] bg-black flex items-center justify-center gap-[15px] text-white font-semibold">
                  <User className="w-[27px] h-[27px]" />
                  <span>Login</span>
                </div>
              </Link>

              <Link
                href="/sinup"
                className="w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300 flex items-center justify-center bg-[linear-gradient(to_bottom_right,_#2e8eff_0%,_rgba(46,142,255,0)_30%)] bg-[rgba(46,142,255,0.2)] hover:bg-[rgba(46,142,255,0.7)] hover:shadow-[0_0_10px_rgba(46,142,255,0.5)]"
              >
                <div className="w-[127px] h-[47px] rounded-[13px] bg-black flex items-center justify-center text-white font-semibold">
                  Register
                </div>
              </Link>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default Navbar;