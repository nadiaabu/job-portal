import React, { useEffect, useState } from 'react';
import { useParams } from 'react';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (id) {
  
      fetch(`https://job-portal-1-md06.onrender.com/jobs/${id}`)
        .then((res) => res.json())
        .then((data) => setJob(data))
        .catch((err) => console.error('Error fetching job details:', err));
    }
  }, [id]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Description:</strong> {job.description}</p>
    </div>
  );
};

export default JobDetails;