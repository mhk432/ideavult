'use client'

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CiHome, CiUser } from "react-icons/ci";
import { FaComments, FaLightbulb, FaTimes } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiMenu } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";

const Navbar = () => {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
 

  const { data: session, isPending } = authClient.useSession();

  

  const handleLogout = async () => {
    await authClient.signOut();
    setOpen(false);
    setMobileMenu(false);
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-base-300 shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="text-3xl">💡</div>
          <div className="font-bold text-2xl tracking-tight">
            <span className="text-green-500">Idea</span>
            <span className="text-green-600">Vault</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 bg-white/60 dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
          <Link href="/" className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${pathName === "/" ? "bg-lime-200 text-green-700 font-medium" : "hover:bg-gray-100"}`}>
            <CiHome /> Home
          </Link>
          <Link href="/ideas" className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${pathName === "/ideas" ? "bg-lime-200 text-green-700 font-medium" : "hover:bg-gray-100"}`}>
            <HiOutlineLightBulb /> Ideas
          </Link>

          {session?.user && (
            <>
              <Link href="/ad-Idea" className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${pathName === "/ad-Idea" ? "bg-lime-200 text-green-700 font-medium" : "hover:bg-gray-100"}`}>
                <GoPlus /> Add Idea
              </Link>
              <Link href="/myideas" className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${pathName === "/myideas" ? "bg-lime-200 text-green-700 font-medium" : "hover:bg-gray-100"}`}>
                <FaLightbulb /> My Ideas
              </Link>
              <Link href="/my-interactions" className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${pathName === "/my-interactions" ? "bg-lime-200 text-green-700 font-medium" : "hover:bg-gray-100"}`}>
                <FaComments /> Interactions
              </Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <input type="checkbox" onClick={toggleTheme} defaultChecked className="toggle toggle-primary" />

          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-3xl">
            {mobileMenu ? <FaTimes /> : <HiMenu />}
          </button>

          {session?.user ? (
            <div className="relative">
              <button onClick={() => setOpen(!open)} className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2 hover:bg-gray-50">
                <Image width={42} height={42} src={session.user.image || "/user.png"} alt="" className="rounded-full border-2 border-green-400" />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border z-50 py-2">
                  <div className="px-6 py-5 border-b text-center">
                    <Image width={75} height={75} src={session.user.image || "/user.png"} alt="" className="rounded-full mx-auto border-4 border-green-400" />
                    <h3 className="font-semibold mt-3">{session.user.name}</h3>
                    <p className="text-sm text-gray-500">{session.user.email}</p>
                  </div>

                  <Link href="/" className="block px-6 py-3 hover:bg-gray-100" onClick={() => setOpen(false)}>🏠 Home</Link>
                  <Link href="/profile" className="block flex items-center gap-2 px-6 py-3 hover:bg-gray-100" onClick={() => setOpen(false)}>
                    <CiUser className="text-blue-400 text-2xl" /> Profile
                  </Link>
                  <Link href="/ideas" className="block px-6 py-3 hover:bg-gray-100" onClick={() => setOpen(false)}>💡 All Ideas</Link>
                  <Link href="/ad-Idea" className="block px-6 py-3 hover:bg-gray-100" onClick={() => setOpen(false)}>➕ Add Idea</Link>
                  <Link href="/myideas" className="block px-6 py-3 hover:bg-gray-100" onClick={() => setOpen(false)}>🌟 My Ideas</Link>
                  <Link href="/my-interactions" className="block px-6 py-3 hover:bg-gray-100" onClick={() => setOpen(false)}>💬 My Interactions</Link>

                  <div className="border-t mt-2 pt-2">
                    <button onClick={handleLogout} className="w-full text-left flex items-center gap-1 px-6 py-3 text-red-500 hover:bg-red-50"><MdOutlineLogout /> Logout</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/login" className="btn btn-outline">Login</Link>
              <Link href="/sinup" className="btn btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>

      {/* ==================== MOBILE MENU ==================== */}
      {mobileMenu && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t py-6 px-6 shadow-lg">
          <div className="flex flex-col gap-4 text-lg">
            <Link href="/" onClick={() => setMobileMenu(false)} className="py-3 px-4 hover:bg-gray-100 rounded-xl">🏠 Home</Link>
            <Link href="/ideas" onClick={() => setMobileMenu(false)} className="py-3 px-4 hover:bg-gray-100 rounded-xl">💡 Ideas</Link>

            {session?.user ? (
              <>
                <Link href="/profile" onClick={() => setMobileMenu(false)} className="py-3 px-4 hover:bg-gray-100 rounded-xl flex items-center gap-2">
                  <CiUser className="text-xl" /> Profile
                </Link>
                <Link href="/ad-Idea" onClick={() => setMobileMenu(false)} className="py-3 px-4 hover:bg-gray-100 rounded-xl">➕ Add Idea</Link>
                <Link href="/myideas" onClick={() => setMobileMenu(false)} className="py-3 px-4 hover:bg-gray-100 rounded-xl">🌟 My Ideas</Link>
                <Link href="/my-interactions" onClick={() => setMobileMenu(false)} className="py-3 px-4 hover:bg-gray-100 rounded-xl">💬 My Interactions</Link>
              </>
            ) : (
              <div className="flex flex-col gap-3 pt-6">
                <Link href="/login" onClick={() => setMobileMenu(false)} className="btn btn-outline w-full text-center py-3">Login</Link>
                <Link href="/sinup" onClick={() => setMobileMenu(false)} className="btn btn-primary w-full text-center py-3">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;