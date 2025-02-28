const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  city: String,
  alertType: String,
  timestamp: Date
});

module.exports = mongoose.model('Alert', alertSchema);