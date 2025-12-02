import { Redis } from 'ioredis';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from '../../config/env.js';
import { logger } from '../../services/LoggerService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const certsDir = path.join(__dirname, '../../../certs');

logger.info('Redis TLS/mTLS enabled - loading certificates from certs/ directory');

// Load CA certificate - try multiple possible filenames
const caPossiblePaths = [
  path.join(certsDir, 'rootca.crt'),
  path.join(certsDir, 'ca.crt'),
  path.join(certsDir, 'ca.pem'),
  path.join(certsDir, 'ca-cert.crt'),
  path.join(certsDir, 'ca-cert.pem')
];

let ca: Buffer | undefined;
for (const caPath of caPossiblePaths) {
  if (existsSync(caPath)) {
    try {
      ca = readFileSync(caPath);
      logger.info(`Redis CA certificate loaded from ${path.basename(caPath)}`);
      break;
    } catch (error) {
      logger.error(`Failed to load Redis CA certificate from ${path.basename(caPath)}:`, error);
      throw error;
    }
  }
}

if (!ca) {
  logger.warn('Redis CA certificate not found. Tried: rootca.crt, ca.crt, ca.pem, ca-cert.crt, ca-cert.pem');
}

// Load client certificate and key for mTLS - try multiple possible filenames
const certPossiblePaths = [
  path.join(certsDir, 'redis.crt'),
  path.join(certsDir, 'client-cert.crt'),
  path.join(certsDir, 'client-cert.pem'),
  path.join(certsDir, 'client.crt'),
  path.join(certsDir, 'client.pem')
];

const keyPossiblePaths = [
  path.join(certsDir, 'redis.key'),
  path.join(certsDir, 'client-key.key'),
  path.join(certsDir, 'client-key.pem'),
  path.join(certsDir, 'client.key'),
  path.join(certsDir, 'client.pem')
];

let cert: Buffer | undefined;
let key: Buffer | undefined;

for (const certPath of certPossiblePaths) {
  if (existsSync(certPath)) {
    try {
      cert = readFileSync(certPath);
      logger.info(`Redis client certificate loaded from ${path.basename(certPath)}`);
      break;
    } catch (error) {
      logger.error(`Failed to load Redis client certificate from ${path.basename(certPath)}:`, error);
      throw error;
    }
  }
}

for (const keyPath of keyPossiblePaths) {
  if (existsSync(keyPath)) {
    try {
      key = readFileSync(keyPath);
      logger.info(`Redis client key loaded from ${path.basename(keyPath)}`);
      break;
    } catch (error) {
      logger.error(`Failed to load Redis client key from ${path.basename(keyPath)}:`, error);
      throw error;
    }
  }
}

if (!cert || !key) {
  logger.warn('Redis client certificates not found (mTLS disabled)');
  logger.warn('Tried cert files: redis.crt, client-cert.crt, client-cert.pem, client.crt, client.pem');
  logger.warn('Tried key files: redis.key, client-key.key, client-key.pem, client.key, client.pem');
}

// Build Redis configuration
const redisConfig = {
  host: env.REDIS_HOST,
  port: parseInt(env.REDIS_PORT),
  username: env.REDIS_USERNAME,
  password: env.REDIS_PASSWORD,
  lazyConnect: true,
  db: parseInt(env.REDIS_DB),
  connectTimeout: 15000,
  tls: ca && cert && key ? {
    rejectUnauthorized: true,
    ca: ca,
    cert: cert,
    key: key,
  } : undefined
};

const redisClient = new Redis(redisConfig);

redisClient.on('error', (err) => {
  logger.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  logger.info('Connected to Redis');
});

redisClient.on('ready', () => {
  logger.info('Redis connection established and ready');
});

async function initRedis(): Promise<void> {
  try {
    await redisClient.connect();
    logger.info('Redis initialized successfully');
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    process.exit(1);
  }
}

async function disconnectRedis(): Promise<void> {
  await redisClient.quit();
  logger.info('Redis disconnected');
}

export { redisClient, initRedis, disconnectRedis };
