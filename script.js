const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const apiKey = '98a49cf4b8c8585dfee8392bc08d883d';

app.use(express.json());

// Endpoint for city-based weather data
app.get('/api/weather', async (req, res) => {
  const cityName = req.query.city;
  if (!cityName) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    );

    const data = response.data;
    res.json({
      temperature: data.main.temp,
      humidity: data.main.humidity,
      weather: data.weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch weather data' });
  }
});

// Endpoint for location-based weather data
app.get('/api/weather/location', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude parameters are required' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    const data = response.data;
    res.json({
      temperature: data.main.temp,
      humidity: data.main.humidity,
      weather: data.weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
