import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const initialJobs = [
    {
      id: "1",
      _id: "1",
      title: "Backend Node.js Engineer",
      company: "CodeLab",
      location: "Sylhet (Hybrid)",
      salary: "$70,000/yr",
      description: "Looking for an experienced Node.js developer to build scalable REST APIs and manage databases.",
      requirements: ["Node.js", "Express", "MongoDB", "REST API design"]
    },
    {
      id: "2",
      _id: "2",
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "Chittagong",
      salary: "$45,000/yr",
      description: "Join our creative team to design modern user interfaces for web and mobile applications.",
      requirements: ["Figma", "Adobe XD", "Wireframing", "Prototyping"]
    },
    {
      id: "3",
      _id: "3",
      title: "React Developer",
      company: "TechCorp",
      location: "Dhaka (Remote)",
      salary: "$60,000/yr",
      description: "We need a frontend developer skilled in React and modern CSS frameworks like Tailwind CSS.",
      requirements: ["React.js", "Tailwind CSS", "JavaScript ES6+", "Git"]
    }
  ];

  useEffect(() => {
    const savedLocalJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const localCombined = [...initialJobs, ...savedLocalJobs];
    setJobs(localCombined);
    setLoading(false);

    const fetchFromApi = async () => {
      try {
        const res = await fetch('https://job-portal-1-md06.onrender.com/api/jobs');
        if (res.ok) {
          const apiJobs = await res.json();
          const merged = [...initialJobs, ...savedLocalJobs, ...apiJobs];
          
          const uniqueJobs = Array.from(
            new Map(merged.map(item => [item.id || item._id, item])).values()
          );
          setJobs(uniqueJobs);
        }
      } catch (err) {
        console.log("Background API error:", err);
      }
    };

    fetchFromApi();
  }, []);

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await fetch(`https://job-portal-1-md06.onrender.com/api/jobs/${jobId}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.log("Delete error:", err);
      }

      const updatedJobs = jobs.filter((j) => (j.id !== jobId && j._id !== jobId));
      setJobs(updatedJobs);

      const savedLocalJobs = JSON.parse(localStorage.getItem('jobs')) || [];
      const filteredLocal = savedLocalJobs.filter((j) => (j.id !== jobId && j._id !== jobId));
      localStorage.setItem('jobs', JSON.stringify(filteredLocal));

      alert("Job deleted successfully!");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      job.title?.toLowerCase().includes(term) ||
      job.company?.toLowerCase().includes(term) ||
      job.location?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-6xl mx-auto my-10 p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Available Jobs</h1>
        <input
          type="text"
          placeholder="Search by job title, company, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {loading ? (
        <div className="text-center my-20 text-gray-600 font-semibold">Loading jobs...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center my-20 text-gray-500">No jobs found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id || job._id}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                <p className="text-blue-600 font-medium text-sm mt-1">{job.company}</p>
                <div className="text-gray-500 text-xs mt-3 space-y-1">
                  <p>📍 {job.location}</p>
                  <p>💰 {job.salary}</p>
                </div>
                <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                  {job.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <Link
                  to={`/jobs/${job.id || job._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleDeleteJob(job.id || job._id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-2 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;