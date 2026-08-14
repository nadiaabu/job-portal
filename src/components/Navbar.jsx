import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ background: '#1f2937', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Job Portal</Link>
      </div>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
        <Link to="/jobs" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>All Jobs</Link>
        <Link to="/add-job" style={{ background: '#2563eb', color: '#fff', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>+ Add Job</Link>
        <Link to="/applicants" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Applicants</Link>
        <Link to="/login" style={{ background: '#4b5563', color: '#fff', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;