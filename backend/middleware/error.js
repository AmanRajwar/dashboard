import ErrorHandler from "../utils/ErrorHandler.js";

export const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error';

    // Wrong MongoDB ID error
    if (err.name === 'CastError') {
        const message = `Resource not found: Invalid ${err.keyValue} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        console.log(`Error middleware  -->  Object.keys(err.keyValue) --> ${Object.keys(err.keyValue)}`);
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT error
    if (err.name === 'JsonWebTokenError') {
        const message = `Json web token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    // JWT expired error
    if (err.name === 'TokenExpiredError') { // Adjusted to correct error name for expiration
        const message = `Json web token has expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
