import { Router, json } from 'express';
import weather from '../../src/app/weather';

const router = Router();

router.get('/search', async (req, res) => {
  let { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'required parameter: q' });
  }
  let results = await weather.searchLocation(q);
  res.json(results);
});

router.get('/:geoid', async (req, res) => {
  let { geoid } = req.params;
  let results = await weather.getLocation(geoid);
  res.json(results);
});

router.get('/:geoid/:year/:month/:date', async (req, res) => {
  let { geoid, year, month, date } = req.params;
  let results = await weather.getLocationDay(geoid, [year, month, date]);
  res.json(results);
});

export default router;
