import { RedisStore } from 'connect-redis';
import session from 'express-session';
import { redisConnection } from './redis';
import { config } from '../config';

const sessionStore = new RedisStore({
    client: redisConnection,
    prefix: 'sess:',
});

export const sessionConfig = session({
    store: sessionStore,
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: config.isProd,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    },
});
