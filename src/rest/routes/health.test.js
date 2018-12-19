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
                status: sinon.stub().returns({
                    json: sinon.stub(),
                })
            };
            healthEndpoints().readiness(req, res);
            expect(res.status).to.have.been.calledWith(200);
            expect(res.status().json.firstCall.args[0]).to.deep.equal({ ping: 'pong' })
        });
    });
    describe('liveness', () => {
        it('sends a 200 response with "ping png" json payload', () => {
            let req = {};
            let res = {
                status: sinon.stub().returns({
                    json: sinon.stub(),
                })
            };
            healthEndpoints().liveness(req, res);
            expect(res.status).to.have.been.calledWith(200);
            expect(res.status().json.firstCall.args[0]).to.deep.equal({ ping: 'pong' })
        });
    });
});