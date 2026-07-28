import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import JobDetails from './components/JobDetails';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<JobDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;