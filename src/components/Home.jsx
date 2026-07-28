import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/jobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      <header className="hero">
        <h1>Find Your Dream Job</h1>
        <p>Browse the latest job openings below</p>
      </header>

      <main className="job-list">
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading jobs from server...</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p className="company">{job.company}</p>
              <p className="location">📍 {job.location}</p>
              {job.salary && <p className="salary">💰 {job.salary}</p>}
              <Link to={`/job/${job.id}`}>
                <button className="apply-btn">View Details</button>
              </Link>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default Home;