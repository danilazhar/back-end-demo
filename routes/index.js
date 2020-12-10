let express = require('express');

const UserRouter = require('./UserRouter');

let router = express.Router();

router.use('/users?', UserRouter);

module.exports = router;
