const { createContainer, asFunction, asValue } = require('awilix');

// External Dependencies
const express = require('express');
const getenv = require('getenv');
const morgan = require('morgan');
const winston = require('winston');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Internal Files
const server = require('./server');
const healthEndpoint = require('./rest/routes/heath');
const articleEndpoint = require('./rest/routes/articles');
const routes = require('./rest/index');
const mongodb = require('./repositories/mongodb');
const articleSchema = require('./models/articleSchema');
const articleValidation = require('./rest/routes/utils/articleValidation');
const middleware = require('./middleware/index');

const container = createContainer();

let envVariables;

try {
  envVariables = getenv.multi({
    PORT: ['PORT', 3000],
    USER_PASSWORD: ['USER_PASSWORD'],
  });
  if (!envVariables.USER_PASSWORD) {
    // TODO isValid method and throw new TypeError
    throw new Error('A use password must be set to use this service');
  }
} catch (error) {
  winston.error(error, 'Error while loading environment variables');
  process.exit(1);
}

// External Libraries
container.register({
  app: asFunction(express).singleton(),
  morgan: asValue(morgan),
  logger: asValue(winston),
  bodyParser: asValue(bodyParser),
});

// Mongo Database
container.register({
  mongoose: asFunction(() => mongoose).singleton(),
  mongodb: asFunction(mongodb).singleton(),
  articleSchema: asFunction(articleSchema).singleton(),
});

// Config
container.register({
  envVariables: asValue(envVariables),
});

// Rest
container.register({
  healthEndpoint: asFunction(healthEndpoint),
  envVariables: asValue(envVariables),
  articleEndpoint: asFunction(articleEndpoint),
  middleware: asFunction(middleware).singleton(),
  routes: asFunction(routes),
  server: asFunction(server).singleton(),
});

// Utils
container.register({
  articleValidation: asFunction(articleValidation),
});

module.exports = container.cradle;
