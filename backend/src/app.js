import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import weatherRouter from './routes/weather.routes.js';
import { buildSwaggerSpec } from './utils/swagger.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

const swaggerSpec = buildSwaggerSpec();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/weather', weatherRouter);

app.use(errorHandler);

export default app;
