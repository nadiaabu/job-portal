const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:admin123@cluster0.mongodb.net/jobportal?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
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
  jobId: String,
  name: String,
  email: String,
  resumePath: String,
  appliedAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);
const Application = mongoose.model('Application', applicationSchema);

// API Routes
// 1. Get All Jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/api/jobs', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.post('/api/apply', upload.single('resume'), async (req, res) => {
  try {
    const { jobId, name, email } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    const newApplication = new Application({
      jobId,
      name,
      email,
      resumePath: resumeFile.path
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application saved to database successfully!', application: newApplication });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/', (req, res) => {
  res.send('Job Portal Backend API is Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});