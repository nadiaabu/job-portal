import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AllJobs from './components/AllJobs';
import JobDetails from './components/JobDetails';
import AddJob from './components/AddJob';
import Applicants from './components/Applicants';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<AllJobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/applicants" element={<Applicants />} />
      </Routes>
    </>
  );
}

export default App;