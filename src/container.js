const { createContainer, asFunction, asValue} = require('awilix');
const app = require('express');
const morgan = require('morgan');
const winston = require('winston');
const { promisify } = require('util');
//const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const getEnvVar = require('./utils/getEnvVar');
const server = require('./server');
const healthEndpoint = require('./rest/routes/heath');
const articlesSchema = require('./models/articles');
const articleEndpoint = require('./rest/routes/articles');
const routes = require('./rest/index');
//const logger = require('./utils/logger');

const container = createContainer();

let envVariables;

try {
    //make sure envVariables are avaibale
    envVariables = {
        //if PORT isn't avlaible defaults to 3000`
        PORT: getEnvVar('PORT', 3000)
    }
} catch (err) {
    console.log(err, 'fatel error occured');
    process.exit(1);
}

container.register({
    app: asFunction(app).singleton(),   
    morgan: asValue(morgan),
    logger: asValue(winston),
    promisify: asValue(promisify),
    healthEndpoint: asFunction(healthEndpoint),
    mongoose: asFunction(() => mongoose).singleton(),
    bodyParser: asValue(bodyParser),  
    helmet: asValue(helmet),
    cors: asValue(cors),
    // logger: asValue(logger),
    articleDbModel: asValue(articlesSchema),
    envVariables: asValue(envVariables),
    articleEndpoint: asFunction(articleEndpoint),
    server: asFunction(server).singleton(),
    routes: asFunction(routes),
})

module.exports = container.cradle;