import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#111827] text-white py-3.5 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <span>🎓</span> Job Portal
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link to="/jobs" className="hover:text-gray-300 transition">
            All Jobs
          </Link>
          <Link
            to="/add-job"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md font-medium transition"
          >
            + Add Job
          </Link>
          <Link to="/applicants" className="hover:text-gray-300 transition">
            Applicants
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;