import Link from "next/link";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-white">💡 IdeaVault</h2>
            <p className="mt-3 text-sm">
              Share ideas.<br />Build together.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/ideas" className="hover:text-white">All Ideas</Link></li>
              <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ad-Idea" className="hover:text-white">Add Idea</Link></li>
              <li><Link href="/my-ideas" className="hover:text-white">My Ideas</Link></li>
              <li><Link href="/my-interactions" className="hover:text-white">My Interactions</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p>phon:01604800362</p>
            <p className="text-sm mb-4">mdharun477@gmail.com</p>
            
            <div className="flex gap-5 text-2xl">
              <a href="#" className="hover:text-white"><FaTwitter /></a>
              <a href="#" className="hover:text-white"><FaFacebookF /></a>
              <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
              <a href="#" className="hover:text-white"><FaGithub /></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs mt-12 pt-6 border-t border-gray-800 text-gray-500">
          © {new Date().getFullYear()} IdeaVault. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;