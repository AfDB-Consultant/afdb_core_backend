import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/index';
import { connectDatabase } from './config/database';
import { logger } from './config/logger';
import routes from './routes/index';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.cors.origins, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'afdb-core-backend', timestamp: new Date().toISOString() });
});

app.use('/api/v1', routes);

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'AfDB Core Backend API', version: '1.0.0', description: 'Enterprise Data Engine — Projects, Dashboards, Reports' },
    servers: [{ url: `http://localhost:${config.port}/api/v1` }],
  },
  apis: ['./src/routes/*.ts'],
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

async function start(): Promise<void> {
  await connectDatabase();
  app.listen(config.port, () => {
    logger.info(`🏢 AfDB Core Backend running on port ${config.port}`);
    logger.info(`📚 API docs: http://localhost:${config.port}/api-docs`);
  });
}

start();
export default app;
