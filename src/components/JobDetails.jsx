import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const defaultJobs = [
  {
    _id: '1',
    title: 'Backend Node.js Engineer',
    company: 'CodeLab',
    location: 'Sylhet (Hybrid)',
    salary: '$70,000/yr',
    jobType: 'Full-time',
    description: 'We are looking for an experienced Node.js Developer to build scalable backend services, optimize database queries, and write clean, maintainable code.'
  },
  {
    _id: '2',
    title: 'UI/UX Designer',
    company: 'DesignStudio',
    location: 'Chittagong',
    salary: '$45,000/yr',
    jobType: 'Full-time',
    description: 'Creating beautiful and functional user interfaces for web and mobile applications using Figma and Adobe Creative Suite.'
  },
  {
    _id: '3',
    title: 'React Developer',
    company: 'TechCorp',
    location: 'Dhaka (Remote)',
    salary: '$60,000/yr',
    jobType: 'Remote',
    description: 'Developing high-performance React user interfaces, working closely with designers and backend developers.'
  }
];

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const localJobs = JSON.parse(localStorage.getItem('user_added_jobs')) || [];
    const allJobs = [...localJobs, ...defaultJobs];
    
    // Find job by ID
    const foundJob = allJobs.find((j) => (j._id || j.id)?.toString() === id?.toString());
    setJob(foundJob);
  }, [id]);

  if (!job) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
        <h2>Job Not Found!</h2>
        <Link to="/all-jobs" style={{ color: '#2563eb', fontWeight: 'bold' }}>← Back to All Jobs</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', fontFamily: 'sans-serif' }}>
      <Link to="/all-jobs" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', display: 'inline-block', marginBottom: '20px' }}>
        ← Back to All Jobs
      </Link>

      <h1 style={{ color: '#0f172a', margin: '0 0 10px 0' }}>{job.title}</h1>
      <h3 style={{ color: '#2563eb', margin: '0 0 20px 0' }}>{job.company}</h3>

      <div style={{ display: 'flex', gap: '20px', backgroundColor: '#f1f5f9', padding: '15px', borderRadius: '8px', marginBottom: '25px', color: '#334155' }}>
        <span>📍 <strong>Location:</strong> {job.location}</span>
        {job.salary && <span>💰 <strong>Salary:</strong> {job.salary}</span>}
        {job.jobType && <span>💼 <strong>Type:</strong> {job.jobType}</span>}
      </div>

      <div style={{ lineHeight: '1.6', color: '#475569' }}>
        <h3 style={{ color: '#0f172a' }}>Job Description</h3>
        <p>{job.description || 'No description provided for this job position.'}</p>
      </div>

      <button
        onClick={() => alert('Application submitted successfully!')}
        style={{ marginTop: '30px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;