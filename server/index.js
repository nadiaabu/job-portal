const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/apply', upload.single('resume'), async (req, res) => {
  try {
    const { jobId, name, email } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ success: false, message: 'Resume file is required!' });
    }

    res.status(200).json({
      success: true,
      message: 'Application & Resume submitted successfully!',
      data: {
        jobId,
        name,
        email,
        resumePath: resumeFile.path
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});