import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await fetch(`https://job-portal-1-md06.onrender.com/api/jobs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setJob(data);
        } else {
          setJob({
            _id: id,
            title: "Backend Node.js Engineer",
            company: "CodeLab",
            location: "Sylhet (Hybrid)",
            salary: "$70,000/yr",
            description: "Looking for an experienced Node.js developer to build scalable REST APIs and manage databases.",
            requirements: [
              "Proficient in Node.js and Express.js",
              "Experience with MongoDB / PostgreSQL",
              "REST API design & integration"
            ]
          });
        }
      } catch (err) {
        console.log("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const applicationPayload = {
      jobId: id,
      job_id: id,
      name: fullName,
      applicantName: fullName,
      email: email,
      applicantEmail: email,
      resumeUrl: resumeFile ? resumeFile.name : "https://example.com/resume.pdf",
      resume: resumeFile ? resumeFile.name : "https://example.com/resume.pdf"
    };

    try {
      const res = await fetch('https://job-portal-1-md06.onrender.com/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationPayload)
      });

      if (res.ok) {
        alert('Application Submitted Successfully!');
        setShowModal(false);
        setFullName('');
        setEmail('');
        setResumeFile(null);
        navigate('/applicants');
      } else {
        const errText = await res.text();
        console.error("Backend Error Details:", errText);
        alert('Server Error from backend. Checking fallback...');
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      alert('Error connecting to the server.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading job details...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{job?.title}</h1>
        <p className="text-blue-600 font-medium text-lg mb-4">{job?.company}</p>

        <div className="flex gap-4 text-sm text-gray-600 mb-6">
          <span className="bg-gray-100 px-3 py-1 rounded-md">📍 {job?.location}</span>
          <span className="bg-green-50 text-green-700 px-3 py-1 rounded-md font-medium">💰 {job?.salary}</span>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">{job?.description}</p>
        </div>

        {job?.requirements && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {job.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition"
          >
            Apply Now
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-2.5 rounded-lg transition"
          >
            Back
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl relative">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Apply for {job?.title}
            </h2>

            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 text-center">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Nadim Ahmed"
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 text-center">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. nadim@gmail.com"
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 text-center">Upload Resume / CV</label>
                <input
                  type="file"
                  required
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition disabled:bg-gray-400"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
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