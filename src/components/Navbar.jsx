import React from 'react';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#2c3e50',
      color: 'white'
    }}>
      <h2 style={{ margin: 0 }}>JobPortal</h2>
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        gap: '20px',
        margin: 0,
        padding: 0
      }}>
        <li style={{ cursor: 'pointer' }}>Home</li>
        <li style={{ cursor: 'pointer' }}>Find Jobs</li>
        <li style={{ cursor: 'pointer' }}>Post a Job</li>
      </ul>
    </nav>
  );
};

export default Navbar;