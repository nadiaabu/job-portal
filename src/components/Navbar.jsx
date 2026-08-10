import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-[#0B132B] text-white px-8 py-3.5 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold tracking-wide flex items-center gap-2">
        <span>💼</span> Job Portal
      </div>

      {/* Search Input */}
      <div className="w-1/3">
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full px-4 py-1.5 rounded-full text-black bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Navigation Links & Button */}
      <div className="flex items-center space-x-6 text-sm font-medium">
        <a href="/" className="hover:text-gray-300">Home</a>
        <a href="/jobs" className="hover:text-gray-300">All Jobs</a>
        <button className="bg-[#D9381E] hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-md transition">
          SignUp/Signin
        </button>
      </div>
    </nav>
  );
};

export default Navbar;