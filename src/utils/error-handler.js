/* eslint-disable no-unused-vars */
import dotenv from 'dotenv';

import logger from './logger';

dotenv.config({ path: '../.env' });

export const errorHandler = (error, req, res, next) => {

    const { body, query, headers, method, originalUrl } = req;

    if (error.stack && process.env.NODE_ENV === 'development') {

        console.error({
            message: error.message || error.name
        });
    }

    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json(error);
    }

    if (error.code === 11000) {
        return res.status(400).json(error);
    }

    if (error.stack && process.env.NODE_ENV === 'development') {
        console.error(error, error.stack);
    }


    if (error.errors) {
        logger.log('error', `Error response while requesting ${method} ${originalUrl}`, { tags: 'http', additionalInfo: { body, query, headers, response: { status: 400, message: error.errors } }});
        return res.status(400).json({
            message: 'Invalid request',
            errors: error.errors
        });
    }

    logger.log('error', `Error response while requesting ${method} ${originalUrl}`, { tags: 'http', additionalInfo: { body, query, headers, response: { status: error.status || 500, message: error.message || error.name || error } }});

    return res.status(error.status || 406).json({
        message: error.message || error.name || error
    });
};
