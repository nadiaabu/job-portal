import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const job = {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const applicationData = {
      name: name,
      email: email,
      jobId: id || "1",
      resumeUrl: resume ? resume.name : "Nadia_CV.pages"
    };

    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
      });

      if (response.ok) {
        alert("Application Submitted Successfully!");
        setShowModal(false);
        navigate('/applicants');
      } else {
        // ব্যাকএন্ডে কোনো কারণে ফেইল করলে লোকালি ডাটা সেভ করার জন্য লোকালস্টোরেজে রেখে Applicants পেজে পাঠাবে
        const existing = JSON.parse(localStorage.getItem('applicants') || '[]');
        localStorage.setItem('applicants', JSON.stringify([...existing, applicationData]));
        
        alert("Application Submitted Successfully!");
        setShowModal(false);
        navigate('/applicants');
      }
    } catch (error) {
      // ব্যাকএন্ড অফলাইন থাকলেও localStorage-এ সেভ হয়ে Applicants পেজে দেখাবে
      const existing = JSON.parse(localStorage.getItem('applicants') || '[]');
      localStorage.setItem('applicants', JSON.stringify([...existing, applicationData]));

      alert("Application Submitted Successfully!");
      setShowModal(false);
      navigate('/applicants');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold' }}>{job.title}</h1>
        <p style={{ textAlign: 'center', color: '#2563eb', fontWeight: '600', marginBottom: '20px' }}>{job.company}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
          <span style={{ background: '#f3f4f6', padding: '6px 16px', borderRadius: '20px', fontSize: '14px' }}>📍 {job.location}</span>
          <span style={{ background: '#ecfdf5', color: '#059669', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>💵 {job.salary}</span>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>Description</h3>
          <p style={{ textAlign: 'center', color: '#4b5563', marginTop: '8px' }}>{job.description}</p>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>Requirements</h3>
          <ul style={{ maxWidth: '400px', margin: '12px auto', color: '#4b5563' }}>
            {job.requirements.map((req, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>{req}</li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button 
            onClick={() => setShowModal(true)}
            style={{ background: '#2563eb', color: '#fff', padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
            Apply Now
          </button>
          <button 
            onClick={() => navigate(-1)}
            style={{ background: '#e5e7eb', color: '#374151', padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
            Back
          </button>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '450px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Apply for {job.title}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Upload Resume / CV</label>
                <input 
                  type="file" 
                  onChange={(e) => setResume(e.target.files[0])}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{ background: '#e5e7eb', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  style={{ background: '#2563eb', color: '#fff', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
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