// external dependencies
const { createContainer, asFunction, asValue } = require('awilix')
const app = require('express')
const morgan = require('morgan')
const winston = require('winston')
const { promisify } = require('util')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const helmet = require('helmet');
// const cors = require('cors');

// internal files
const getEnvVar = require('./utils/getEnvVar')
const server = require('./server')
const healthEndpoint = require('./rest/routes/heath')
const articleEndpoint = require('./rest/routes/articles')
const routes = require('./rest/index')
const mongodb = require('./repositories/mongodb')
const articleSchema = require('./models/articleSchema')
const articlevalidation = require('./rest/routes/utils/articleValidation')
// const logger = require('./utils/logger');

const container = createContainer()

// get env variables
let envVariables

try {
  envVariables = {
    // if PORT isn't avlaible defaults to 3000`
    PORT: getEnvVar('PORT', 3000)
  }
} catch (err) {
  console.log('A fatel error occured while fetching env variables:', err)
  process.exit(1)
}

// mongo database specific dependencies
container.register({
  mongoose: asFunction(() => mongoose).singleton()
  //   mongodb: asFunction(mongodb).singleton(),
})

// external dependencies
container.register({
  app: asFunction(app).singleton(),
  morgan: asValue(morgan),
  logger: asValue(winston),
  promisify: asValue(promisify),
  bodyParser: asValue(bodyParser)
  // helmet: asValue(helmet),
  // cors: asValue(cors),
})

// application files
container.register({
  mongodb: asFunction(mongodb).singleton(),
  articleSchema: asFunction(articleSchema).singleton(),
  healthEndpoint: asFunction(healthEndpoint),
  envVariables: asValue(envVariables),
  articleEndpoint: asFunction(articleEndpoint),
  server: asFunction(server).singleton(),
  routes: asFunction(routes),
  articlevalidation: asFunction(articlevalidation)
})

module.exports = container.cradle
