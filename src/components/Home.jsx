import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Render-এর লাইভ ব্যাকএন্ড URL
    fetch('https://job-portal-1-md06.onrender.com/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error('Error fetching jobs:', err));
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title?.toLowerCase().includes(search.toLowerCase()) ||
    job.company?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      {/* Search Input */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Search jobs by title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '12px 20px',
            borderRadius: '25px',
            border: '1px solid #ccc',
            fontSize: '16px',
            outline: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}
        />
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>Available Jobs</h2>

      {/* Jobs Grid Container */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job._id || job.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e1e4e8',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#1a202c', fontSize: '20px' }}>{job.title}</h3>
                <p style={{ margin: '5px 0', color: '#4a5568' }}>
                  <strong>Company:</strong> {job.company}
                </p>
                <p style={{ margin: '5px 0', color: '#718096' }}>
                  <strong>Location:</strong> {job.location}
                </p>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Link
                  to={`/jobs/${job._id || job.id}`}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    backgroundColor: '#2563eb',
                    color: '#fff',
                    padding: '10px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#718096' }}>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
