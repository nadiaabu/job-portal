import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqArray = requirements.split(',').map((item) => item.trim());

    const newJob = {
      id: String(Date.now()),
      _id: String(Date.now()),
      title,
      company,
      location,
      salary,
      description,
      requirements: reqArray,
    };

    const existingJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const updatedJobs = [newJob, ...existingJobs];
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));

    try {
      await fetch('https://job-portal-1-md06.onrender.com/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });
    } catch (err) {
      console.log('Saved to LocalStorage successfully');
    }

    alert('Job Added Successfully!');
    navigate('/jobs');
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Post a New Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Frontend Developer"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Google"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Dhaka (Remote)"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
            <input
              type="text"
              required
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. $50,000/yr"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
          <textarea
            rows="3"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the job role..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (comma separated)</label>
          <input
            type="text"
            required
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="e.g. React, JavaScript, Tailwind"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2.5 rounded shadow hover:bg-blue-700 transition"
        >
          Post Job Now
        </button>
      </form>
    </div>
  );
};

export default AddJob;