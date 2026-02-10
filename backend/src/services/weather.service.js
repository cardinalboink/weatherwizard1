import axios from 'axios';
import { AppError } from '../utils/errors.js';

const WEATHER_URL = 'https://archive-api.open-meteo.com/v1/archive';

export async function getAverageTemperature({
  latitude,
  longitude,
  days
}) {
  if (!latitude || !longitude || !days) {
    throw new AppError(
      'latitude, longitude and days are required',
      400,
      'VALIDATION_ERROR'
    );
  }

  if (!Number.isInteger(days) || days <= 0 || days > 30) {
    throw new AppError(
      'days must be an integer between 1 and 30',
      400,
      'VALIDATION_ERROR'
    );
  }

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - (days - 1));

  const formatDate = (d) => d.toISOString().split('T')[0];

  try {
    const response = await axios.get(WEATHER_URL, {
      params: {
        latitude,
        longitude,
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
        daily: 'temperature_2m_mean',
        timezone: 'auto'
      }
    });

    const temps = response.data?.daily?.temperature_2m_mean;

    if (!temps || temps.length === 0) {
      throw new AppError(
        'No temperature data available',
        502,
        'UPSTREAM_ERROR'
      );
    }

    const validTemps = temps.filter(
      (t) => typeof t === 'number'
    );

    const sum = validTemps.reduce((a, b) => a + b, 0);
    const average = sum / validTemps.length;

    return {
      averageTemperature: Number(average.toFixed(2)),
      unit: 'C',
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      count: validTemps.length
    };
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      'Failed to fetch weather data',
      502,
      'UPSTREAM_ERROR'
    );
  }
}

export function computeAverageTemperature(values) {
  const valid = values.filter(v => typeof v === 'number');
  if (!valid.length) return null;

  const sum = valid.reduce((a, b) => a + b, 0);
  return Number((sum / valid.length).toFixed(2));
}

