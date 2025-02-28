const axios = require('axios');
const Weather = require('../models/Weather');
const Alert = require('../models/Alert');
axios.defaults.family = 4;


let cities = ['London', 'New York', 'Tokyo','Thrissur','Chennai','Kochi','Kolkata','Kottayam'];

const processWeatherData = async () => {
  for (const city of cities) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
      );
      const data = response.data;

      // Save weather data
      await Weather.create({
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        timestamp: new Date(data.dt * 1000)
      });

      // Check alert conditions
      const tempC = data.main.temp - 273.15; // Kelvin to Celsius
      const desc = data.weather[0].description.toLowerCase();
      const timestamp = new Date(data.dt * 1000);

      if (desc.includes('rain')) {
        console.log(`Alert: Rain detected in ${city} at ${timestamp}`);
        await Alert.create({ city, alertType: 'Rain', timestamp });
      }
      if (tempC > 30) {
        console.log(`Alert: High temperature (${tempC}°C) detected in ${city} at ${timestamp}`);
        await Alert.create({ city, alertType: 'HighTemp', timestamp });
      }
      if (tempC < 10) {
        console.log(`Alert: Low temperature (${tempC}°C) detected in ${city} at ${timestamp}`);
        await Alert.create({ city, alertType: 'LowTemp', timestamp });
      }
    } catch (err) {
      console.error(`Error fetching weather for ${city}:`, err.message);
    }
  }
};

// Functions to manage cities
const addCity = (city) => {
  if (!cities.includes(city)) cities.push(city);
};

const removeCity = (city) => {
  cities = cities.filter(c => c.toLowerCase() !== city.toLowerCase());
};

module.exports = { processWeatherData, addCity, removeCity };