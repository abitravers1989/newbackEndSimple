const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
chai.use(require('sinon-chai'));

const indexFactory = require('./index');

describe('app', ()=> {
    const sandbox = sinon.createSandbox();
    const dependencies = {
        healthEndpoint: {
            readiness: sandbox.stub(),
            liveness: sandbox.stub(),
        },
        articleEndpoint: {
            find: () => {},
            create: () => {},
        },
        logger: {
            error: () => {},
        }
    };

    const index = indexFactory(dependencies);

    afterEach(() => sandbox.reset());

    after(() => sandbox.restore());

    describe('index', () => {
        const app = {
            get: sandbox.stub(),
            post: sandbox.stub(),
        };
        beforeEach(() => {
            index.setupEndpoints(app);
        })
        describe('setupEndpoints(app)', () => {
            it('sets the correct routes', () => {
                //index.setupEndpoints(app)
                const expectedprivateRoutes = ['/private/readiness', '/private/liveness'];
                expect(app.get).to.have.been.calledWith(expectedprivateRoutes);

                const expectedErrorRoute = '*';
                expect(app.get).to.have.been.calledWith(expectedErrorRoute);
            });
            it('adds the correct response to the private routes', () => {
                // app.get.returns(mockRes)
                // let mockRes = {
                //     status: sinon.stub().returns({
                //         json: sinon.stub(),
                //     })
                // };

                // expect(mockRes.status).to.have.been.calledWith(200);
            });
            it('adds the correct response to the error route', () => {

            });

            describe('it calls the healthEndpoint', () => {
                it('sets up /readiness endpoint', () => {
                    //index.setupEndpoints(app)
                    const expectedReadinesseRoutes = '/api/readiness';
                    //app.get.yields();
                    expect(app.get).to.have.been.calledWith(expectedReadinesseRoutes);
                    //expect(dependencies.healthEndpoint.readiness).to.have.been.called;
                });
                it('sets up /liveness endpoint', () => {
                });
            })
        });
    });
});

//https://github.com/ComparetheMarket/rewards.meerkat-memberships/blob/master/src/rest/health.spec.js