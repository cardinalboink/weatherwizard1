# Weather Data Aggregation Frontend

This is the frontend application for the Weather Data Aggregation project. It allows users to input a city and number of days, fetch the average temperature from the backend API, and display the results.

---

## Features

- Input form for city and number of days.
- Client-side validation.
- Displays computed average temperature.
- Toast notifications for success and error states.
- Loading state handling.
- Integration tests (Jest + React Testing Library).
- Dockerized production build.

---

## Tech Stack

- **Next.js** (App Router)
- **React + TypeScript**
- **CSS Modules**
- **Jest + React Testing Library**
- **Docker**

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **npm**
- Backend server running (see backend README)

---

## Setup Instructions

### 1. Navigate to the `frontend` folder

```bash
cd frontend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Create a `.env.local` file

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

---

### 4. Run the development server

```bash
npm run dev
```

Application runs at:

```
http://localhost:3000
```

---

## Running Tests

```bash
npm test
```

---

## Production Build

```bash
npm run build
npm start
```

---

## Docker Instructions

### Build Image

```bash
docker build -t weatherwizard1-frontend .
```

### Run Container

```bash
docker run -p 3000:3000 weatherwizard1-frontend
```

Application will be available at:

```
http://localhost:3000
```

---

## Folder Structure

```
frontend/
├── src/
│   ├── app/                # App Router pages
│   ├── components/         # Reusable UI components
│   ├── lib/                # API and validation logic
│   └── styles/             # CSS modules
├── Dockerfile
├── jest.config.js
└── README.md
```

---

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build production application
- `npm start` — Start production server
- `npm test` — Run integration tests

---

## Notes

- The frontend connects to the backend using `NEXT_PUBLIC_BACKEND_URL`.
- When using Docker Compose, this is set to:

```
http://backend:3001
```

- Ensure backend service is running before making requests.
