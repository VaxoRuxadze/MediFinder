const express = require('express');
const router = express.Router();
const axios = require('axios');
// const authMiddleware = require('../middleware/auth'); // თუ არ გჭირდება, დააკომენტარე

router.get('/nearby', async (req, res) => {  // წაშალე authMiddleware თუ არ გინდა
  try {
    const { lat, lng, radius = 2000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Location coordinates are required' });
    }

    const { data } = await axios.get(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      {
        params: {
          location: `${lat},${lng}`,
          radius: radius,
          type: 'pharmacy',
          key: process.env.GOOGLE_MAPS_API_KEY,
          language: 'ka'
        }
      }
    );

    const pharmacies = data.results.map(place => ({
      id: place.place_id,
      name: place.name,
      address: place.vicinity,
      rating: place.rating || null,
      userRatingsTotal: place.user_ratings_total || 0,
      openNow: place.opening_hours?.open_now || false,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      photoRef: place.photos?.[0]?.photo_reference || null,
      types: place.types
    }));

    res.json({
      success: true,
      count: pharmacies.length,
      pharmacies,
      location: { lat: parseFloat(lat), lng: parseFloat(lng) }
    });
  } catch (error) {
    console.error('Pharmacy API error:', error);
    res.status(500).json({ error: 'Failed to fetch nearby pharmacies' });
  }
});

module.exports = router;