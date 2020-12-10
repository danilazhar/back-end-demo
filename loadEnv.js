module.exports = function () {
    let envVariables = require('dotenv').config({
        path: __dirname + '/.env',
        debug: process.env.DEBUG,
    });

    if (envVariables.error) {
        throw envVariables.error;
    }
}();
