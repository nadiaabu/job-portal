import React from 'react';

const Home = () => {
  const jobs = [
    { id: 1, title: "React Developer", company: "TechCorp", location: "Dhaka (Remote)" },
    { id: 2, title: "UI/UX Designer", company: "DesignStudio", location: "Chittagong" },
    { id: 3, title: "Frontend Intern", company: "SoftMind", location: "Sylhet" }
  ];

  const handleApply = (jobTitle, companyName) => {
    alert(`Successfully Applied for "${jobTitle}" at ${companyName}!`);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', marginBottom: '80px' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Find Your Dream Job</h1>
      <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Browse the latest job openings below</p>
      
      <div style={{ display: 'grid', gap: '20px', marginTop: '30px' }}>
        {jobs.map((job) => (
          <div key={job.id} style={{
            padding: '20px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            backgroundColor: '#ffffff'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2980b9' }}>{job.title}</h3>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{job.company}</p>
            <p style={{ margin: '5px 0', color: '#7f8c8d' }}>📍 {job.location}</p>
            <button 
              onClick={() => handleApply(job.title, job.company)}
              style={{
                marginTop: '10px',
                padding: '8px 15px',
                backgroundColor: '#2ecc71',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;