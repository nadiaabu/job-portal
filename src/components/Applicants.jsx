import React, { useState, useEffect } from 'react';

const Applicants = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('https://job-portal-1-md06.onrender.com/api/applications');
        if (res.ok) {
          const data = await res.json();
          setApplications(data);
        }
      } catch (err) {
        console.log("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="w-full px-4 md:px-12 py-8">
      <div className="w-full bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 text-center md:text-left">
          Job Applications Received
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center py-10">Loading applicants...</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No applications received yet.</p>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm">
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Applicant Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Job ID</th>
                  <th className="p-3 border">Resume</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={app._id || index} className="hover:bg-gray-50 text-sm border-b">
                    <td className="p-3 font-semibold">{index + 1}</td>
                    <td className="p-3 font-medium text-gray-800">{app.name}</td>
                    <td className="p-3 text-gray-600">{app.email}</td>
                    <td className="p-3 text-blue-600 font-medium">{app.jobId || "N/A"}</td>
                    <td className="p-3">
                      {app.resumeUrl ? (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded text-xs hover:underline"
                        >
                          View Resume
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">Uploaded</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;