const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://nadiaabu2003_db_user:nadia002@cluster0.7ktk3ay.mongodb.net/jobPortalDB?retryWrites=true&w=majority&appName=Cluster0";

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String
});

const Job = mongoose.model('Job', jobSchema);

const seedJobs = async () => {
  try {
    const count = await Job.countDocuments();
    if (count === 0) {
      await Job.insertMany([
        { title: "React Developer", company: "TechCorp", location: "Dhaka (Remote)", salary: "$60,000/yr" },
        { title: "UI/UX Designer", company: "DesignStudio", location: "Chittagong", salary: "$45,000/yr" },
        { title: "Backend Node.js Engineer", company: "CodeLab", location: "Sylhet (Hybrid)", salary: "$70,000/yr" }
      ]);
      console.log("Sample jobs inserted to MongoDB!");
    }
  } catch (error) {
    console.error("Error seeding jobs:", error);
  }
};

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB Connected Successfully!');
    seedJobs();
  })
  .catch(err => console.error('MongoDB Connection Error:', err));

app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let job = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      job = await Job.findById(id);
    }

    if (!job) {
      const jobs = await Job.find();
      const index = parseInt(id) - 1;
      if (!isNaN(index) && jobs[index]) {
        job = jobs[index];
      }
    }

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});