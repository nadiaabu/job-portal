import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://job-portal-1-md06.onrender.com/jobs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
        setJobs([]);
      });
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title?.toLowerCase().includes(search.toLowerCase()) ||
    job.company?.toLowerCase().includes(search.toLowerCase()) ||
    job.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1e293b' }}>
        All Available Jobs
      </h2>

      {/* Search Input */}
      <div style={{ maxWidth: '500px', margin: '0 auto 35px auto' }}>
        <input
          type="text"
          placeholder="Search by job title, company, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '15px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Jobs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job._id || job.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>{job.title}</h3>
                <p style={{ color: '#2563eb', fontWeight: 'bold', margin: '0 0 10px 0' }}>{job.company}</p>
                <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0' }}>📍 {job.location}</p>
                {job.salary && <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0' }}>💰 {job.salary}</p>}
              </div>

              <Link
                to={`/jobs/${job._id || job.id}`}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  padding: '10px 0',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  marginTop: '15px'
                }}
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#64748b' }}>
            No jobs match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllJobs;