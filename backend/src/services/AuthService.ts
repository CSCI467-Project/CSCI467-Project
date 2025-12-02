import { env } from '../config/env.js';
import { logger } from './LoggerService.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { redisClient } from '../storage/databases/RedisClient.js';

export async function generateJwtToken(userId: string) {
  const jti = uuidv4();
  const payload = {
    sub: userId,
    jti: jti
  }

  return jwt.sign(payload, env.JWT_SECRET!,{
    algorithm: 'HS512',
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

export async function expireToken(token: string) : Promise<void> {
    try {
      //Calcuate TTL for the token
      const decoded  = jwt.decode(token, { complete: true });
      
      const { jti, exp } = decoded?.payload as { jti: string; exp: number  };

      if (!jti || !exp) {
        logger.error('Invalid token structure, missing jti or exp');
        throw new Error('Token missing jti or exp');
      }

      const ttl = Math.max(10, exp - Math.floor(Date.now() / 1000));
      await redisClient.setex(`revoked:${jti}`, ttl, 'true');
    } catch (error) {
      logger.error('Error setting JWT token expiration:', error);
      throw error;
    }
}

export async function isTokenBlacklisted(jti: string): Promise<boolean> {
  try {
    const isBlacklisted = await redisClient.exists(`revoked:${jti}`);
    return isBlacklisted === 1;
  } catch (error) {
    logger.error('Error checking token blacklist status:', error);
    return false;
  }
}


