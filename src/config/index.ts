import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '4001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodb: { uri: process.env.MONGODB_URI || 'mongodb://localhost:27018/afdb_core' },
  redis: { host: process.env.REDIS_HOST || 'localhost', port: parseInt(process.env.REDIS_PORT || '6379', 10) },
  jwt: { accessSecret: process.env.JWT_ACCESS_SECRET || 'dev-access-secret' },
  internalApiKey: process.env.INTERNAL_API_KEY || 'dev-api-key',
  cors: { origins: (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:3001,http://192.168.1.74:3000,http://192.168.1.74:3001').split(',') },
};
