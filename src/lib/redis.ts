import IORedis from 'ioredis';
import { config } from '../config';

export const redisConnection = new IORedis(config.redisUrl);

redisConnection.on('error', (error) => {
    console.error('Redis Connection Error');
    console.error(`Message: ${error.message}`);
    process.exit(1);
});

redisConnection.on('connect', () => {
    console.log(`Redis Connected: OK`);
});
