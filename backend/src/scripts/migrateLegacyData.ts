import mysql from 'mysql2/promise';
import { prisma } from '../storage/databases/Prisma.js';
import { env } from '../config/env.js';
import { logger } from '../services/LoggerService.js';

interface LegacyPart {
  number: number;
  description: string;
  price: number;
  weight: number;
  pictureURL: string;
}

async function migrateLegacyData() {
  logger.info('Starting legacy data migration...');

  let connection;

  try {
    // Connect to legacy MySQL database
    connection = await mysql.createConnection({
      host: env.LEGACY_MYSQL_HOST,
      port: env.LEGACY_MYSQL_PORT,
      user: env.LEGACY_MYSQL_USER,
      password: env.LEGACY_MYSQL_PASSWORD,
      database: env.LEGACY_MYSQL_DATABASE
    });

    logger.info('Connected to legacy MySQL database');

    // Fetch all parts
    const [rows] = await connection.execute('SELECT * FROM parts');
    const parts = rows as LegacyPart[];

    logger.info(`Found ${parts.length} parts in legacy database`);

    // Import into PostgreSQL
    let imported = 0;
    let skipped = 0;

    for (const part of parts) {
      try {
        // Generate random quantity between 10-50
        const quantity = Math.floor(Math.random() * 41) + 10;

        await prisma.product.create({
          data: {
            name: `Part ${part.number}`,
            description: part.description || 'No description available',
            price: part.price,
            weight: part.weight,
            pictureURL: part.pictureURL || 'https://via.placeholder.com/300x200',
            quantity
          }
        });

        imported++;
        logger.info(`Imported part ${part.number} with quantity ${quantity}`);
      } catch (error: any) {
        // Skip duplicates
        if (error.code === 'P2002') {
          skipped++;
          logger.warn(`Skipped duplicate part: ${part.number}`);
        } else {
          logger.error(`Error importing part ${part.number}:`, error);
        }
      }
    }

    logger.info(`Migration completed: ${imported} imported, ${skipped} skipped`);
  } catch (error) {
    logger.error('Migration failed:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      logger.info('Disconnected from legacy MySQL database');
    }
    await prisma.$disconnect();
  }
}

// Run migration
migrateLegacyData()
  .then(() => {
    logger.info('Migration script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    logger.error('Migration script failed:', error);
    process.exit(1);
  });
