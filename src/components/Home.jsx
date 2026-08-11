import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const defaultJobs = [
  {
    _id: '1',
    title: 'Backend Node.js Engineer',
    company: 'CodeLab',
    location: 'Sylhet (Hybrid)',
    salary: '$70,000/yr'
  },
  {
    _id: '2',
    title: 'UI/UX Designer',
    company: 'DesignStudio',
    location: 'Chittagong',
    salary: '$45,000/yr'
  },
  {
    _id: '3',
    title: 'React Developer',
    company: 'TechCorp',
    location: 'Dhaka (Remote)',
    salary: '$60,000/yr'
  }
];

const Home = () => {
  const [jobs, setJobs] = useState(defaultJobs);

  useEffect(() => {
    fetch('https://job-portal-1-md06.onrender.com/jobs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
      });
  }, []);

  const featuredJobs = jobs.slice(0, 3);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <div
        style={{
          borderRadius: '16px',
          marginBottom: '40px',
          height: '240px',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#ffffff',
          textAlign: 'center'
        }}
      >
        <h1 style={{ fontSize: '36px', margin: '0 0 10px 0' }}>Find Your Dream Job!</h1>
        <p style={{ fontSize: '16px', opacity: 0.9 }}>Discover top career opportunities today.</p>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1e293b' }}>
        Latest Job Openings
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
        {featuredJobs.map((job) => (
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
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '35px' }}>
        <Link
          to="/all-jobs"
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: '12px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            display: 'inline-block'
          }}
        >
          See All Jobs
        </Link>
      </div>
    </div>
  );
};

export default Home;