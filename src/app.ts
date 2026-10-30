import express from 'express';
import { apiRouter } from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/error-handler.js';
import { requestLogger } from './middlewares/request-logger.js';

export const app = express();

app.use(requestLogger);
app.use(express.json());
app.use('/api/v1', apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);
