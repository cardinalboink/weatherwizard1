import express from 'express';
import { getAverageWeather } from '../controllers/weather.controller.js';

const router = express.Router();

/**
 * @openapi
 * /weather/average:
 *   get:
 *     summary: Get average temperature over the past X days for a city
 *     description: Resolves the city to coordinates, fetches historical daily temperatures, and returns the computed average.
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         example: Kuala Lumpur
 *       - in: query
 *         name: days
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 30
 *         example: 7
 *     responses:
 *       200:
 *         description: Average temperature computed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 city:
 *                   type: string
 *                 days:
 *                   type: integer
 *                 averageTemperature:
 *                   type: number
 *                 unit:
 *                   type: string
 *                 startDate:
 *                   type: string
 *                 endDate:
 *                   type: string
 *                 count:
 *                   type: integer
 *                 cached:
 *                   type: boolean
 *             example:
 *               city: Kuala Lumpur, MY
 *               days: 7
 *               averageTemperature: 28.31
 *               unit: C
 *               startDate: 2026-02-03
 *               endDate: 2026-02-09
 *               count: 7
 *               cached: false
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: days must be a positive integer
 *                 code: VALIDATION_ERROR
 *       404:
 *         description: City not found
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "City not found: Asdfqwerty"
 *                 code: CITY_NOT_FOUND
 *       502:
 *         description: Upstream provider error
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: Failed to fetch weather data
 *                 code: UPSTREAM_ERROR
 */
router.get('/average', getAverageWeather);

export default router;
