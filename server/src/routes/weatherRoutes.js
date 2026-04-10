import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { fetchWeather } from '../services/weatherService.js';

const router = Router();
router.get('/', protect, async (req, res) => {
  try {
    const city = req.query.city || 'Nagpur';
    const weather = await fetchWeather(city);
    res.json(weather);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
