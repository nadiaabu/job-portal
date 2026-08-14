import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ব্যাকএন্ড API থেকে জবগুলো ফেচ করা হচ্ছে
    fetch('http://localhost:5000/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading jobs from database...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>All Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs found in the database.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {jobs.map((job) => (
            <div key={job._id} style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3>{job.title}</h3>
              <p style={{ color: '#4b5563', fontWeight: 'bold' }}>{job.company}</p>
              <p style={{ color: '#6b7280' }}>📍 {job.location}</p>
              <p style={{ color: '#059669', fontWeight: 'bold' }}>💰 {job.salary}</p>
              <p style={{ marginTop: '10px', fontSize: '14px' }}>{job.description?.substring(0, 80)}...</p>
              <Link to={`/jobs/${job._id}`} style={{ display: 'inline-block', marginTop: '15px', color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
                View Details &rarr;
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllJobs;