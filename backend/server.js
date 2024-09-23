const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

// Start the server
const PORT = process.env.PORT || 9002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
