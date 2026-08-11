import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 40px',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      fontFamily: 'sans-serif'
    }}>
      <h2 style={{ margin: 0, fontSize: '22px' }}>
        <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>
          💼 Job Portal
        </Link>
      </h2>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: '500' }}>
          Home
        </Link>
        <Link to="/all-jobs" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: '500' }}>
          All Jobs
        </Link>
        <Link
          to="/add-job"
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          + Add Job
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;