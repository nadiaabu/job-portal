const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
    const db = client.db('jobPortalDB');
    const jobCollection = db.collection('jobs');

    app.get('/jobs', async (req, res) => {
      try {
        const jobs = await jobCollection.find().toArray();
        res.send(jobs);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching jobs', error });
      }
    });

    
    app.get('/jobs/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const job = await jobCollection.findOne(query);
        res.send(job);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching single job details', error });
      }
    });

    app.post('/jobs', async (req, res) => {
      try {
        const newJob = req.body;
        const result = await jobCollection.insertOne(newJob);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to add job', error });
      }
    });

    console.log("Successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);

// Root Route
app.get('/', (req, res) => {
  res.send('Job Portal Server is Running...');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});