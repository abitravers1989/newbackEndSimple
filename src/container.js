const { createContainer, asFunction, asValue } = require('awilix');
const express = require('express');
const getEnvVar = require('./getEnvVar');

const server = require('./server');

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
    server: asFunction(server).singleton(),
})

module.exports = container.cradle;