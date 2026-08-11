import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import AllJobs from './components/AllJobs';
import AddJob from './components/AddJob';
import JobDetails from './components/JobDetails';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      
      {/* Navbar */}
      <nav style={{ backgroundColor: '#0f172a', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>
          💼 Job Portal
        </Link>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
          <Link to="/all-jobs" style={{ color: '#fff', textDecoration: 'none' }}>All Jobs</Link>
          <Link to="/add-job" style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
            + Add Job
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#cbd5e1', textAlign: 'center', padding: '20px', marginTop: 'auto' }}>
        <p style={{ margin: 0 }}>Copyright (c) 2026 JobPortal. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;