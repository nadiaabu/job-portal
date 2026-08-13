import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialJobs = [
    {
      id: "1",
      title: "Backend Node.js Engineer",
      company: "CodeLab",
      location: "Sylhet (Hybrid)",
      salary: "$70,000/yr",
      description: "Looking for an experienced Node.js developer to build scalable REST APIs and manage databases.",
      requirements: ["Node.js", "Express", "MongoDB", "REST API design"]
    },
    {
      id: "2",
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "Chittagong",
      salary: "$45,000/yr",
      description: "Join our creative team to design modern user interfaces for web and mobile applications.",
      requirements: ["Figma", "Adobe XD", "Wireframing", "Prototyping"]
    },
    {
      id: "3",
      title: "React Developer",
      company: "TechCorp",
      location: "Dhaka (Remote)",
      salary: "$60,000/yr",
      description: "We need a frontend developer skilled in React and modern CSS frameworks like Tailwind CSS.",
      requirements: ["React.js", "Tailwind CSS", "JavaScript ES6+", "Git"]
    }
  ];

  useEffect(() => {
    // 1. Check LocalStorage
    const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const allJobs = [...initialJobs, ...savedJobs];
    
    // Find job by ID
    const foundJob = allJobs.find((j) => String(j.id) === String(id));
    setJob(foundJob);
  }, [id]);

  const handleApplySubmit = (e) => {
    e.preventDefault();

    if (!resumeFile) {
      alert("Please upload your resume (PDF format)!");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("jobId", id);
    formData.append("name", applicantName);
    formData.append("email", applicantEmail);
    formData.append("resume", resumeFile);

    setTimeout(() => {
      alert(`🎉 Application submitted successfully for ${job.title}!\nResume File: ${resumeFile.name}`);
      
      setIsSubmitting(false);
      setShowModal(false);
      setApplicantName('');
      setApplicantEmail('');
      setResumeFile(null);
    }, 1000);
  };

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-700">Job Not Found!</h2>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Back to All Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg border border-gray-100">
      {/* Job Info Header */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
        <p className="text-xl text-blue-600 font-semibold mt-1">{job.company}</p>
        <div className="flex gap-4 text-gray-500 text-sm mt-3">
          <span>📍 {job.location}</span>
          <span>💰 {job.salary}</span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Job Description</h3>
        <p className="text-gray-600 leading-relaxed">{job.description || "No description provided."}</p>
      </div>

      {/* Requirements */}
      {job.requirements && job.requirements.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Requirements</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-md transition shadow"
        >
          Apply Now
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-2.5 rounded-md transition"
        >
          Back
        </button>
      </div>

      {/* --- APPLICATION MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Apply for {job.title}
            </h2>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Nadia Ahmed"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="e.g. nadia@example.com"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Resume / CV (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;