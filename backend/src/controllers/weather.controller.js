import { AppError } from '../utils/errors.js';
import { geocodeCity } from '../services/geocode.service.js';
import { getAverageTemperature } from '../services/weather.service.js';
import { getCache, setCache } from '../utils/cache.js';

export async function getAverageWeather(req, res, next) {
  try {
    const { city, days } = req.query;

    if (!city || !days) {
      throw new AppError(
        'city and days are required',
        400,
        'VALIDATION_ERROR'
      );
    }

    const parsedDays = Number(days);
    
    if (!Number.isInteger(parsedDays) || parsedDays <= 0) {
      throw new AppError(
        'days must be a positive integer',
        400,
        'VALIDATION_ERROR'
      );
    }

    const normalizedCity = city.trim().toLowerCase();
    const cacheKey = `weather:avg:${normalizedCity}:${parsedDays}`;

    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({
        ...cached,
        cached: true
      });
    }

    const location = await geocodeCity(city);

    const weather = await getAverageTemperature({
      latitude: location.latitude,
      longitude: location.longitude,
      days: parsedDays
    });

    const response = {
      city: `${location.name}, ${location.country}`,
      days: parsedDays,
      ...weather,
      cached: false
    };

    setCache(cacheKey, response);

    res.json(response);
  } catch (err) {
    next(err);
  }
}

