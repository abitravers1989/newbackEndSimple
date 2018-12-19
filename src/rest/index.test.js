const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
chai.use(require('sinon-chai'));

const indexFactory = require('./index');

describe('app', ()=> {
    const sandbox = sinon.createSandbox();
    const dependencies = {
        healthEndpoint: {
            readiness: () => {},
            liveness: () => {},
        },
        articleEndpoint: {
            find: () => {},
        },
        logger: {
            error: () => {},
        }
    };

    const index = indexFactory(dependencies);

    afterEach(() => sandbox.reset());

    after(() => sandbox.restore());

    describe('index', () => {
        describe('setupEndpoints(app)', () => {
            const app = {
                use: sandbox.stub(),
                get: sandbox.stub(),
                post: sandbox.stub(),
            };
            it('sets the correct routes', () => {
                index.setupEndpoints(app)
                const expectedRoutes = ['/private/readiness', '/private/liveness'];
                expect(app.get).to.have.been.calledWith(expectedRoutes);
            });
        });
    });
});