Real-Time Weather Alert System

This is a Node.js-based application that fetches real-time weather data for multiple cities and triggers alerts based on specific conditions.
Setup Instructions
Prerequisites

Ensure you have the following installed on your system:

    Node.js (Latest LTS version recommended)
    MongoDB (Ensure MongoDB is running)

Installation Steps

    Clone the repository
    git clone https://github.com/MariaAnnGeorge/WeatherAlert.git
    cd WeatherAlert

    Install dependencies
    npm install

    Set up MongoDB
        Ensure MongoDB is running. If using a local MongoDB instance, start it with:
        mongod --dbpath C:\data\db # Adjust the path if necessary

    Configure environment variables
        Create a .env file in the project root and add the following:
        PORT=3000
        WEATHER_API_KEY=your_api_key_here
        MONGODB_URI=mongodb://localhost:27017/weatherDB
        Replace your_api_key_here with your actual API key from OpenWeatherMap.

    Start the server
    node server.js

Features

    Fetches weather data for multiple cities every 10 minutes.
    Triggers alerts based on the following conditions:
        Rain detected in the forecast.
        High temperature (>30°C).
        Low temperature (<10°C).
    Stores weather data and alerts in MongoDB:
        weathers collection (stores fetched weather data).
        alerts collection (stores triggered alerts).

API Endpoints

    GET /weather - Retrieve weather data for all cities
    GET /alerts - Retrieve all triggered alerts
    POST /cities - Add a new city for tracking
    DELETE /cities/:city - Remove a city from tracking
