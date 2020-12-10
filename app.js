require('./loadEnv');
new (require('./db'))();

const app = require('express')();
const bodyParser = require('body-parser');
let indexRouter = require('./routes/index');
let cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', indexRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, function () {
    console.log('listening on http port: ' + process.env.PORT);
});
