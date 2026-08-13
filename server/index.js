const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://nadiaabu2003_db_user:nadia00222@cluster0.7ktk3ay.mongodb.net/job-portal?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
  description: String,
  requirements: [String],
  createdAt: { type: Date, default: Date.now }
});

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  jobId: { type: String, default: "1" },
  resumeUrl: { type: String, default: "" },
  appliedAt: { type: Date, default: Date.now }
});

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find().sort({ appliedAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/applications', async (req, res) => {
  try {
    const { name, applicantName, email, applicantEmail, jobId, job_id, resumeUrl, resume } = req.body;

    const application = new Application({
      name: name || applicantName || "Applicant",
      email: email || applicantEmail || "no-email@example.com",
      jobId: jobId || job_id || "1",
      resumeUrl: resumeUrl || resume || "https://example.com/resume.pdf"
    });

    await application.save();
    return res.status(200).json({ message: "Success", application });
  } catch (error) {
    console.error("MongoDB Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});