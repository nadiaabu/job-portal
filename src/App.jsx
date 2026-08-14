import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AllJobs from './components/AllJobs';
import JobDetails from './components/JobDetails';
import AddJob from './components/AddJob';
import Applicants from './components/Applicants';
import Login from './components/Login';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f3f4f6' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<AllJobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;