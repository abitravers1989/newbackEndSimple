const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
chai.use(require('sinon-chai'));

const healthEndpoints = require('./heath');

describe('healthEndpoints', () => {
    describe('readiness', () => {
        it('sends a 200 response with "ping png" json payload', () => {
            let req = {};
            let res = {
                status: () => {
                    json: () => {}
                }
            };

            healthEndpoints.readiness(req, res)
        })
    })
});