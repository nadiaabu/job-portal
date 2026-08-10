import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Live Render Backend API
      fetch(`https://job-portal-1-md06.onrender.com/jobs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // Backend Response Array or Object Handling
          if (Array.isArray(data)) {
            setJob(data[0]);
          } else {
            setJob(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching job details:', err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Job details not found!</h2>
        <Link to="/" style={{ color: '#2563eb', textDecoration: 'none' }}>
          Back to Home
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

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', color: '#64748b', fontSize: '15px' }}>
          <span>📍 {job.location}</span>
          {job.salary && <span>💰 {job.salary}</span>}
          {job.jobType && <span>💼 {job.jobType}</span>}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />

        <h3 style={{ color: '#1e293b', marginBottom: '10px' }}>Job Description</h3>
        <p style={{ color: '#475569', lineHeight: '1.6' }}>
          {job.description || 'No detailed description available for this position.'}
        </p>

        {job.requirements && (
          <>
            <h3 style={{ color: '#1e293b', marginTop: '20px', marginBottom: '10px' }}>Requirements</h3>
            <p style={{ color: '#475569', lineHeight: '1.6' }}>{job.requirements}</p>
          </>
        )}

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