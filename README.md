# Weather Data Aggregation App

This is a full-stack application that allows users to fetch and display the average temperature for a given city over a specified number of past days.

The project consists of:

1. A **backend API** built with Node.js and Express.
2. A **frontend application** built with Next.js.

---

## Features

- Input a city and number of days.
- Backend fetches historical weather data and computes the average temperature.
- Caching mechanism to optimize repeated requests.
- Responsive and user-friendly UI.

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **npm**
- **Docker** (for containerized setup)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/cardinalboink/weatherwizard1.git
cd weatherwizard1
```

---

### 2. Run Backend Locally

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```
http://localhost:3001
```

Run tests:

```bash
npm test
```

---

### 3. Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

Run tests:

```bash
npm test
```

---

## Docker Instructions

### Run Full Stack with Docker Compose

From the project root:

```bash
docker compose up --build
```

Services will be available at:

- Backend:  `http://localhost:3001`
- Frontend: `http://localhost:3000`

To stop the services:

```bash
docker compose down
```

---

## Folder Structure

```
weatherwizard1/
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
```

---
