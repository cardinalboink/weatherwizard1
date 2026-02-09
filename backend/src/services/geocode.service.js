import axios from 'axios';
import { AppError } from '../utils/errors.js';

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export async function geocodeCity(city) {
  try {
    const response = await axios.get(GEOCODE_URL, {
      params: {
        name: city,
        count: 1
      }
    });

    const results = response.data?.results;

    if (!results || results.length === 0) {
      throw new AppError(
        `City not found: ${city}`,
        404,
        'CITY_NOT_FOUND'
      );
    }

    const place = results[0];

    return {
      name: place.name,
      country: place.country,
      latitude: place.latitude,
      longitude: place.longitude
    };
  } catch (err) {
    // pass through known errors
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      'Failed to resolve city coordinates',
      502,
      'UPSTREAM_ERROR'
    );
  }
}
