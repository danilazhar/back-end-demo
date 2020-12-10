const HttpStatus = require('http-status-codes');

class CustomError extends Error {
    /**
     * Create a new error object with the code and message specified
     *
     * @param {string} message           Response message
     * @param {number} [code]     HTTP Status Code to respond with
     */
    constructor(message, code) {
        super();
        // noinspection JSUnresolvedFunction
        Error.captureStackTrace(this, CustomError);
        this.code = code || HttpStatus.INTERNAL_SERVER_ERROR;
        this.message = this.code + ': ' + message;
    }

    /**
     * Handle the error object, by responding with the code and message that were thrown
     *
     * @param err
     * @param res
     * @param {Object} [extraData={}]
     */
    static Handle(err, res, extraData) {
        extraData = typeof extraData !== 'undefined' ? extraData : {};

        console.error(err.stack);
        if (!(err instanceof CustomError)) {
            if (err.name === 'ValidationError') {
                err = new CustomError(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
            } else {
                err = new CustomError('Something went wrong.');
            }
        }

        res.status(err.code).json({
            msg: err.message,
            ...extraData
        }).end();
    }
}

module.exports = CustomError;
