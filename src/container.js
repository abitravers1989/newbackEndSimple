const { createContainer, asFunction, asValue } = require('awilix');
const express = require('express');
const getEnvVar = require('./getEnvVar');

const container = createContainer();

let envVariables;

try {
    //make sure envVariables are avaibale
    envVariables = {
        //if PORT isn't avlaible defaults to 3000`
        PORT: getEnvVar('PORT', 3000)
    }
}