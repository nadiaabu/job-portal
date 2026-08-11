import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    jobType: 'Full-time',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://job-portal-1-md06.onrender.com/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data._id) {
          alert('Job posted successfully!');
          navigate('/');
        }
      })
      .catch((err) => console.error('Error adding job:', err));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1e293b' }}>Post a New Job</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required style={inputStyle} />
        <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required style={inputStyle} />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required style={inputStyle} />
        <input type="text" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} style={inputStyle} />
        
        <select name="jobType" value={formData.jobType} onChange={handleChange} style={inputStyle}>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} rows="4" style={inputStyle}></textarea>
        
        <button type="submit" style={{ padding: '12px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
          Publish Job
        </button>
      </form>
    </div>
  );
};

const inputStyle = { padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none' };

export default AddJob;