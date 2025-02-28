require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const connectDB = require('./config/db');
const weatherService = require('./services/weatherService');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  weatherService.processWeatherData(); // Initial fetch
});

// Schedule weather fetch every 10 minutes
cron.schedule('*/10 * * * *', () => {
  console.log('Fetching weather data...');
  weatherService.processWeatherData();
});