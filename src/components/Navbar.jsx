
'use client'

import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <div>

      <div className="flex justify-between items-center px-20 p-5 shadow-xl">

        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="text-3xl ">💡</div>
            <div className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
              <span className="text-green-400">Idea</span><span className="text-green-600">Vault</span>
            </div>
          </Link>
        </div>
        <div className='hidden md:flex gap-8'>
          <Link href="/" className={pathName === "/" ? "text-blue-500 font-semibold underline" : ""}>Home</Link>

          <Link href="/ideas" className={pathName === "/ideas" ? "text-blue-500 font-semibold underline" : ""}>Ideas</Link>

          <Link href="/ad-Idea" className={pathName === "/ad-Idea" ? "text-blue-500 font-semibold underline" : ""}>Add Idea</Link>
          <Link href="/myideas" className={pathName === "/myideas" ? "text-blue-500 font-semibold underline " : ""}>My Ideas</Link>

          <Link href="/my-interactions" 
          className={pathName === "/my-interactions" ? "text-blue-500 font-semibold underline " : ""}>My Interactions</Link>

        </div>

        <div className="flex gap-2">


          <Link href='/login' className="w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300 flex items-center justify-center bg-[linear-gradient(to_bottom_right,_#2e8eff_0%,_rgba(46,142,255,0)_30%)] bg-[rgba(46,142,255,0.2)] hover:bg-[rgba(46,142,255,0.7)] hover:shadow-[0_0_10px_rgba(46,142,255,0.5)]">
            <div className="w-[127px] h-[47px] rounded-[13px] bg-black flex items-center justify-center gap-[15px] text-white font-semibold">
              <User className="w-[27px] h-[27px]" />
              <span>Login</span>
            </div>
          </Link>

          <Link href='/register' className="w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300 flex items-center justify-center bg-[linear-gradient(to_bottom_right,_#2e8eff_0%,_rgba(46,142,255,0)_30%)] bg-[rgba(46,142,255,0.2)] hover:bg-[rgba(46,142,255,0.7)] hover:shadow-[0_0_10px_rgba(46,142,255,0.5)]">
            <div className="w-[127px] h-[47px] rounded-[13px]  bg-black flex items-center justify-center gap-[15px] text-white font-semibold">

              <span>Register</span>
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
};

export default Navbar;