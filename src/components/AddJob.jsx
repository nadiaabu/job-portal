import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddJob() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Job added successfully to MongoDB!');
        navigate('/jobs');
      } else {
        alert('Failed to add job.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Server connection error.');
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '30px auto', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Post a New Job</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
        <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
        <input type="text" name="salary" placeholder="Salary Range" value={formData.salary} onChange={handleChange} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
        <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} rows="4" required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}></textarea>
        <button type="submit" style={{ padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          Post Job
        </button>
      </form>
    </div>
  );
}

export default AddJob;