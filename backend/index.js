// backend/index.js
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const noteRoutes = require('./routes/notes'); // Import routes

const app = express();
const PORT = process.env.PORT || 3000;


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api/notes', noteRoutes); 


app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
