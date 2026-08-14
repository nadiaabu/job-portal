import React, { useState, useEffect } from 'react';

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
   
    const savedApplicants = JSON.parse(localStorage.getItem('applicants') || '[]');
    setApplicants(savedApplicants);
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>Job Applications Received</h1>

      {applicants.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>No applications received yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {applicants.map((app, index) => (
            <div key={index} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1f2937' }}>👤 Name: {app.name}</h3>
              <p style={{ margin: '0 0 6px 0', color: '#4b5563' }}>📧 Email: {app.email}</p>
              <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>📄 Resume/CV: {app.resumeUrl}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicants;