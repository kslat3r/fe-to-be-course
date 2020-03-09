require('dotenv').config();

const express = require('express');
const uptimeMiddleware = require('./middleware/uptime');
const YAML = require('yamljs');
const path = require('path');
const swaggerTools = require('swagger-tools');
const createError = require('http-errors');
const logger = require('morgan');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(uptimeMiddleware);

const swagger = YAML.load(path.resolve(`${__dirname}/definitions/api.yaml`));

swaggerTools.initializeMiddleware(swagger, (swaggerMiddleware) => {
  app.use(swaggerMiddleware.swaggerMetadata());
  app.use(swaggerMiddleware.swaggerValidator());

  app.use('/api', usersRouter);

  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({ error: err.message });
  });
});

module.exports = app;
