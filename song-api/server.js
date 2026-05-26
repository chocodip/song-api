const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
const songRoutes = require('./routes/songRoutes');
app.use('/api', songRoutes);

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => {
    console.log(error);
  });

// ROOT ROUTE
app.get('/', (req, res) => {
  res.send('Song API Running');
});

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});