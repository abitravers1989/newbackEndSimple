const { createContainer, asFunction, asValue,  asClass} = require('awilix');
const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const { promisify } = require('util');
const router = express.Router();
const bodyParser = require('body-parser');

const getEnvVar = require('./getEnvVar');
const server = require('./server');
const healthEndpoint = require('./routes/heath')

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
    app: asFunction(express),   
    envVariables: asValue(envVariables),
    morgan: asValue(morgan),
    logger: asValue(winston),
    promisify: asValue(promisify),
    server: asFunction(server).singleton(),
    healthEndpoint: asFunction(healthEndpoint),
    router: asFunction(router),
    bodyParser: asValue(bodyParser)
})

module.exports = container.cradle;