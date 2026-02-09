import express from 'express';
import cors from 'cors';
import weatherRouter from './routes/weather.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';


const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/weather', weatherRouter);
app.use(errorHandler);


export default app;
