# Weather Data Aggregation API (Backend)

This is the backend service for the Weather Data Aggregation project. It provides an API to fetch historical weather data for a specified city and calculate the average temperature over a given number of days.

## Features

- Fetches historical weather data from a third-party API.
- Calculates the average temperature for the past X days.
- 15-minute in-memory caching.
- Centralized error handling.
- API documentation with Swagger.
- Unit and integration tests.

## Tech Stack

- **Node.js** with **Express**
- **Axios** for HTTP requests
- **Jest + Supertest** for testing
- **Swagger** for API documentation

## Prerequisites

- **Node.js** (v18 or later)
- **npm**

## Setup Instructions

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   PORT=3001
   BASE_URL=https://archive-api.open-meteo.com/v1/archive
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Access Swagger documentation at:

   ```
   http://localhost:3001/docs
   ```

## API Endpoint

### GET `/weather/average`

Fetch the average temperature for a given city and number of days.

**Query Parameters:**

- `city` (string): Name of the city.
- `days` (number): Number of past days to aggregate.

**Example Request:**

```http
GET /weather/average?city=London&days=3
```

**Example Response:**

```json
{
  "city": "London",
  "days": 3,
  "averageTemperature": 12.4,
  "unit": "C",
  "cached": false
}
```

## Scripts

- `npm run dev`: Run the server in development mode.
- `npm start`: Run the server in production mode.
- `npm test`: Run the test suite.

## Notes

- Ensure the weather API key supports historical data access.
- Cache resets when the server restarts.
