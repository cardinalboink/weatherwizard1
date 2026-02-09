import express from 'express';
import { getAverageWeather } from '../controllers/weather.controller.js';

const router = express.Router();

router.get('/average', getAverageWeather);

export default router;
