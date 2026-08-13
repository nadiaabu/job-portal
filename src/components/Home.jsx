import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [jobs, setJobs] = useState([]);

  
  const dummyJobs = [
    {
      id: "1",
      _id: "1",
      title: "Backend Node.js Engineer",
      company: "CodeLab",
      location: "Sylhet (Hybrid)",
      salary: "$70,000/yr"
    },
    {
      id: "2",
      _id: "2",
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "Chittagong",
      salary: "$45,000/yr"
    },
    {
      id: "3",
      _id: "3",
      title: "React Developer",
      company: "TechCorp",
      location: "Dhaka (Remote)",
      salary: "$60,000/yr"
    }
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('https://job-portal-1-md06.onrender.com/api/jobs');
        if (res.ok) {
          const apiJobs = await res.json();
          if (apiJobs && apiJobs.length > 0) {
            setJobs(apiJobs.slice(0, 3));
            return;
          }
        }
      } catch (err) {
        console.log("Error fetching jobs:", err);
      }
      setJobs(dummyJobs);
    };

    fetchJobs();
  }, []);

  return (
    <div className="w-full px-6 md:px-12 py-6">
      {/* Hero Banner */}
      <div 
        className="w-full relative rounded-xl overflow-hidden mb-10 h-64 flex items-center justify-center text-center bg-cover bg-center shadow-sm"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')` 
        }}
      >
        <div className="text-white px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-wide">Find Your Dream Job!</h1>
          <p className="text-sm md:text-base text-gray-200">Discover top career opportunities today.</p>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Latest Job Openings</h2>
      </div>

      {/* Job Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
        {(jobs.length > 0 ? jobs : dummyJobs).map((job) => (
          <div
            key={job.id || job._id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between text-center"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{job.title}</h3>
              <p className="text-blue-600 font-medium text-sm mb-3">{job.company}</p>
              <div className="text-gray-500 text-xs space-y-1 mb-6">
                <p>📍 {job.location}</p>
                <p>💰 {job.salary}</p>
              </div>
            </div>

            <Link
              to={`/jobs/${job.id || job._id}`}
              className="w-full bg-[#111827] hover:bg-black text-white text-sm font-medium py-2 rounded transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* See All Jobs Button */}
      <div className="text-center mt-10">
        <Link
          to="/jobs"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded-md transition shadow-sm"
        >
          See All Jobs
        </Link>
      </div>
    </div>
  );
};

export default Home;