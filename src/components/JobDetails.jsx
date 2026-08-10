import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const JobDetails = () => {
  const location = useLocation();
  const job = location.state?.job;

  if (!job) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', fontFamily: 'sans-serif' }}>
        <h2>Job details not available!</h2>
        <p style={{ color: '#64748b' }}>Please go back and select a job from the home page.</p>
        <Link to="/" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
        ← Back to Jobs
      </Link>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>{job.title}</h1>
        <p style={{ fontSize: '18px', color: '#2563eb', fontWeight: 'bold', margin: '0 0 20px 0' }}>{job.company}</p>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', color: '#64748b', fontSize: '15px', flexWrap: 'wrap' }}>
          <span>📍 {job.location}</span>
          {job.salary && <span>💰 {job.salary}</span>}
          {job.jobType && <span>💼 {job.jobType}</span>}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />

        <h3 style={{ color: '#1e293b', marginBottom: '10px' }}>Job Description</h3>
        <p style={{ color: '#475569', lineHeight: '1.6' }}>
          {job.description || 'We are looking for a dedicated professional to join our dynamic team. Responsible for core development and collaborating with cross-functional teams.'}
        </p>

        <button
          onClick={() => alert('Application Submitted Successfully!')}
          style={{
            marginTop: '30px',
            backgroundColor: '#0f172a',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;