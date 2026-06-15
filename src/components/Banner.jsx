"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      title: "Turn Your Idea Into Reality",
      desc: "Join the community of innovators and startup founders",
      bgImg: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      cta: "Explore Ideas"
    },
    {
      title: "Share  Validate  Grow",
      desc: "Get honest feedback from real entrepreneurs",
      bgImg: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cta: "Explore Ideas"
    },
    {
      title: "Innovation Has No Limits",
      desc: "Discover groundbreaking startup ideas every day",
      bgImg: "https://plus.unsplash.com/premium_photo-1683121716061-3faddf4dc504?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cta: "Explore Ideas"
    },
  ];

  const goToSlide = useCallback((index) => {
    setCurrent(index);
  }, []);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-5 relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden">

      {/* Background Image Slider */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${slides[current].bgImg})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="text-center absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40 text-center"></div>
      </div>

      {/* Content */}
      <div className=" relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 w-full z-10">
        <div className="text-center flex justify-center">

          {/* Left Side Text */}
          <div className="  space-y-6 md:text-left max-w-lg animate__animated animate__fadeInLeft">
            <h1 className="text-4xl sm:text-5xl text-center
            md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
              {slides[current].title}
            </h1>

            <p className="text-center text-lg text-white/90 max-w-md mx-auto md:mx-0">
              {slides[current].desc}
            </p>
              
              <div className="flex justify-center">

            <Link href="/" >
              <button className=" flex items-center gap-2 px-8 py-4 bg-lime-400 hover:bg-red-600 text-white text-lg font-semibold rounded-full shadow-xl transition-all hover:scale-105 active:scale-95">
                {slides[current].cta} <IoIosArrowRoundForward size={30} />
              </button>
            </Link>
              </div>
          </div>


        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute left-4 right-4 md:left-10 md:right-10 top-1/2 -translate-y-1/2 flex justify-between z-20">
        <button
          onClick={() => goToSlide((current - 1 + slides.length) % slides.length)}
          className="bg-white/90 hover:bg-white text-gray-800 w-12 h-12 flex items-center justify-center rounded-full text-2xl shadow-lg transition-all active:scale-90"
        >
          ❮
        </button>

        <button
          onClick={() => goToSlide((current + 1) % slides.length)}
          className="bg-white/90 hover:bg-white text-gray-800 w-12 h-12 flex items-center justify-center rounded-full text-2xl shadow-lg transition-all active:scale-90"
        >
          ❯
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all ${current === index
                ? "bg-red-500 w-10"
                : "bg-white/60 hover:bg-white w-3"
              }`}
          />
        ))}
      </div>
    </div>
  );
}