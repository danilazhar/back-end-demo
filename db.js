let dbInstance;
class Db {
    constructor() {
        if (typeof dbInstance !== "undefined") {
            console.warn('Trying to init DB again.');
        }

        const mongoose = require('mongoose');

        // noinspection JSIgnoredPromiseFromCall
        mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });

        dbInstance = mongoose.connection;
        dbInstance.once('open', function () {
            console.log('db connected to ' + process.env.DB_NAME);
        });

        dbInstance.on('error', console.error.bind(console, 'connection error:'));

        Db.dbInstance = dbInstance;
        return dbInstance;
    }

    static getDbInstance() {
        if (typeof dbInstance === 'undefined') {
            console.error('DB was never initialized.');
        }
        return dbInstance;
    }
}

module.exports = Db;
