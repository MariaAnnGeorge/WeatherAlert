const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  description: String, 
  timestamp: Date
});

module.exports = mongoose.model('Weather', weatherSchema);