# Real-Time Weather Alert System
## Setup
1. Install Node.js and MongoDB.
2. Run `mongod --dbpath C:\data\db` (adjust path).
3. Run `npm install`.
4. Use `.env` with `PORT=3000` and `WEATHER_API_KEY=your_key`.
5. Start: `node server.js`.
## Features
- Fetches weather for multiple cities every 10 minutes.
- Triggers alerts for rain, high (>30°C), and low (<10°C) temps.
- Stores data in MongoDB (`weathers`, `alerts` collections).
- API: GET /weather, GET /alerts, POST /cities, DELETE /cities/:city.
