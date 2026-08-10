import React, { useEffect, useState } from 'react';

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Render backend live URL
    fetch('https://job-portal-1-md06.onrender.com/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error('Error fetching jobs:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Jobs</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {jobs.map((job) => (
          <div key={job._id || job.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;