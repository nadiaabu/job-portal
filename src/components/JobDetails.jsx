import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:5001/jobs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setJob(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching job details:', err);
          setJob(null);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-xl font-bold">Loading details...</div>;
  }

  if (!job || job.message) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Job not found!</h2>
        <Link to="/" className="text-blue-600 font-semibold hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg rounded-xl border border-gray-100">
      <Link to="/" className="text-blue-600 font-semibold mb-6 inline-block hover:underline">
        ← Back to Jobs
      </Link>
      
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
        <p className="text-xl text-blue-600 mt-2 font-medium">{job.company}</p>
      </div>

      <div className="my-6 grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <p className="text-gray-500 text-sm">Location</p>
          <p className="font-semibold text-gray-700">📍 {job.location}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Salary</p>
          <p className="font-semibold text-gray-700">💰 {job.salary}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Job Description</h3>
        <p className="text-gray-600 leading-relaxed">
          We are seeking a talented {job.title} to join our dynamic team at {job.company}. 
          You will be responsible for building scalable web applications and delivering exceptional user experiences.
        </p>
      </div>

      <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow transition">
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;