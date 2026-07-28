import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/jobs')
      .then((res) => res.json())
      .then((data) => {
        const singleJob = data.find((j) => j.id === parseInt(id));
        setJob(singleJob);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching job details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '50px' }}>Loading details...</p>;
  }

  if (!job) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Job Not Found!</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
      <h2>{job.title}</h2>
      <h4 style={{ color: '#555' }}>{job.company}</h4>
      <p>📍 Location: {job.location}</p>
      {job.salary && <p>💰 Salary: {job.salary}</p>}
      <br />
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>← Back to All Jobs</Link>
    </div>
  );
}

export default JobDetails;