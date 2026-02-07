import path from 'path';

import express from 'express';
import morgan from 'morgan';

import { config } from './config';
import { logger } from './utils/logger.util';

const app = express();

if (config.isProd) {
    app.use(
        morgan('combined', {
            stream: {
                write: (message) => logger.info(message.trim()),
            },
        }),
    );
} else {
    app.use(morgan('dev'));
}

app.use('/public', express.static(path.resolve(__dirname, '..', 'public')));

app.use(express.urlencoded());
app.use(express.json());

// add Middlewares

// add Routers

// 404
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send('Page not found');
});

// Error
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).send(message);
});

app.listen(config.port, config.host, () => {
    console.log(`Server is running at http://${config.host}:${config.port}`);
});
