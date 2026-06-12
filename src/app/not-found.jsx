import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-slate-200">
  
  <div className="text-center backdrop-blur-lg bg-white/5 p-10 rounded-2xl shadow-2xl max-w-md w-full">
    
  
    <div className="text-6xl mb-4">⚠️</div>

   
    <div className="text-7xl font-bold text-sky-400">404</div>

    
    <div className="text-xl font-semibold mt-2">Page Not Found</div>

 
    <div className="text-slate-400 mt-2 mb-6">
      Sorry, the page you are looking for doesn’t exist or has been moved.
    </div>

   
    <Link href="/" 
       className="flex items-center justify-center px-2 py-3 rounded-full 
        text-stone-50 font-semibold hover:bg-sky-500  btn
         bg-green-400">Go Home
    </Link>

  </div>

</div>
    );
};

export default NotFound;