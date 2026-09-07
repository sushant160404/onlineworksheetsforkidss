import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { CORS_ORIGINS, IS_PRODUCTION } from './config/env';
import apiRoutes from './routes';
import { notFoundHandler } from './middleware/notFound.middleware';
import { errorHandler } from './middleware/errorHandler.middleware';

const app = express();

// Render (and most PaaS) sit behind a reverse proxy — needed for correct
// protocol/IP detection (rate limiting, secure cookies, req.ip, etc).
app.set('trust proxy', 1);

app.use(helmet());
app.use(compression());
app.use(cors({
  origin(origin, callback) {
    // Allow requests with no origin (curl, server-to-server, health checks)
    if (!origin) return callback(null, true);
    if (CORS_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));

if (!IS_PRODUCTION) {
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });
}

app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
