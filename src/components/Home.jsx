import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error('Error fetching jobs:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="max-w-6xl mx-auto pt-6 px-4">
        <div 
          className="relative h-72 rounded-2xl overflow-hidden bg-cover bg-center flex items-center px-10 border"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-white max-w-xl">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-2">
              Find Your Dream Job!
            </h1>
            <p className="text-gray-200 text-sm md:text-base">
              Discover top career opportunities and take the next step in your professional journey.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Latest Job Openings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div 
              key={job._id} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                <p className="text-blue-600 font-medium text-sm mt-1">{job.company}</p>
                
                <div className="mt-4 text-xs text-gray-500 space-y-1">
                  <p>📍 {job.location}</p>
                  <p>💰 {job.salary}</p>
                </div>
              </div>

              <Link
                to={`/job/${job._id}`}
                className="w-full bg-slate-900 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-slate-800 transition text-center block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;