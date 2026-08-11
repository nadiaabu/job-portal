import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
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
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Banner Section */}
      <div
        style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '40px',
          height: '280px',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#ffffff',
          textAlign: 'center',
          padding: '0 20px'
        }}
      >
        <h1 style={{ fontSize: '38px', fontWeight: 'bold', marginBottom: '10px' }}>
          Find Your Dream Job!
        </h1>
        <p style={{ fontSize: '16px', opacity: 0.9, maxWidth: '600px' }}>
          Discover top career opportunities and take the next step in your professional journey.
        </p>
      </div>

      {/* Section Heading */}
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '26px', color: '#1a202c' }}>
        Latest Job Openings
      </h2>

      {/* Jobs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job._id || job.id}
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '20px', margin: '0 0 8px 0', color: '#1e293b' }}>
                  {job.title}
                </h3>
                <p style={{ color: '#2563eb', fontWeight: '500', margin: '0 0 12px 0' }}>
                  {job.company}
                </p>
                <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0' }}>
                  📍 {job.location}
                </p>
                {job.salary && (
                  <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0' }}>
                    💰 {job.salary}
                  </p>
                )}
              </div>

              <div style={{ marginTop: '20px' }}>
                <Link
                  to={`/jobs/${job._id || job.id}`}
                  state={{ job }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px 0',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#64748b' }}>
            No jobs available right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;