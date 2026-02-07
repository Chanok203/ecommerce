import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: path.resolve(__dirname, '..', '.env'),
});

const getEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`ERROR: Missing env variable [ ${key} ]`);
    }
    return value;
};

export const config = {
    isProd: getEnv('NODE_ENV') === 'production',
    host: getEnv('HOST'),
    port: Number(getEnv('PORT')),
} as const;
