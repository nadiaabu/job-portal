import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#34495e',
      color: 'white',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      left: 0
    }}>
      <p style={{ margin: 0 }}>Copyright (c) 2026 JobPortal. All rights reserved.</p>
    </footer>
  );
};

export default Footer;