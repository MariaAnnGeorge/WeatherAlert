const express = require('express');
const router = express.Router();
const axios = require('axios');
const Weather = require('../models/Weather');
const Alert = require('../models/Alert');
const weatherService = require('../services/weatherService');
axios.defaults.family = 4;

// GET /weather - Latest weather for all cities
router.get('/weather', async (req, res) => {
  try {
    const latestWeather = await Weather.find()
      .sort({ timestamp: -1 })
      .limit(100); 
    res.json(latestWeather.map(w => ({
      city: w.city,
      temperature: (w.temperature - 273.15).toFixed(2),
      description: w.description,
      timestamp: w.timestamp
    })));
  } catch (err) {
    res.status(500).json({ error: 'Error fetching weather data', details: err.message });
  }
});

// GET /alerts - All triggered alerts
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching alerts', details: err.message });
  }
});

// POST /cities - Add a city
router.post('/cities', (req, res) => {
  const { city } = req.body;
  if (!city) return res.status(400).json({ error: 'City name required' });
  weatherService.addCity(city);
  res.status(201).json({ message: `Added ${city} to monitoring list` });
});

// DELETE /cities/:city - Remove a city
router.delete('/cities/:city', (req, res) => {
  const city = req.params.city;
  weatherService.removeCity(city);
  res.json({ message: `Removed ${city} from monitoring list` });
});

// GET /weather/:city - Search weather for a specific city
router.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
    );
    const data = response.data;
    await Weather.create({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      timestamp: new Date(data.dt * 1000)
    });
    res.json({
      city: data.name,
      temperature: (data.main.temp - 273.15).toFixed(2),
      description: data.weather[0].description,
      timestamp: new Date(data.dt * 1000)
    });
  } catch (err) {
    if (err.response?.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.status(500).json({ error: 'Error fetching weather', details: err.message });
    }
  }
});

module.exports = router;