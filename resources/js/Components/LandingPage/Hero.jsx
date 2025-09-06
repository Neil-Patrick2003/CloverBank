import React from 'react';
import { Link } from '@inertiajs/react';

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6"
    >
      {/* Left Content */}
      <div className="w-full pt-28 md:pt-32 md:w-1/2 text-center md:text-left">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Welcome to <span className="text-emerald-600">Clover Bank</span>
        </h1>

        {/* Subtext */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mx-auto md:mx-0">
          Secure, fast, and modern banking built for you. Enjoy instant
          transfers, smart financial tools, and 24/7 protection.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-start justify-center gap-4">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all duration-300 text-center"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-3 border border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-all duration-300 text-center"
          >
            Learn More
          </a>
        </div>

        {/* Stats */}
        <div className="border-t border-gray-200 flex flex-row sm:space-x-12 md:space-x-20 rounded-lg py-10 mt-10 sm:mt-14 gap-6 sm:gap-0">
          <p className="text-gray-600 text-sm flex flex-col items-center sm:items-start">
            <span className="text-3xl sm:text-4xl font-bold text-emerald-600 animate-pulse">
              12K+
            </span>
            Happy Customers
          </p>
          <p className="text-gray-600 text-sm flex flex-col items-center sm:items-start">
            <span className="text-3xl sm:text-4xl font-bold text-emerald-600">
              5K+
            </span>
            Daily Transactions
          </p>
          <p className="text-gray-600 text-sm flex flex-col items-center sm:items-start">
            <span className="text-3xl sm:text-4xl font-bold text-emerald-600">
              24/7
            </span>
            Secure Support
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center mt-10 md:mt-0">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg h-64 sm:h-80 md:h-[600px] bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-gray-400 shadow-md">
          {/* Placeholder for 3D model */}
          <span className="text-sm sm:text-base">3D Model / Illustration</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
