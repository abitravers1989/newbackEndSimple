const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
chai.use(require('sinon-chai'));

const appFactory = require('.');

describe('app', ()=> {
    const sandbox = sinon.createSandbox();
    const dependencies = {
        express: {
            get: sandbox.stub(),
            post: () => {},
        },
    };

    const app = appFactory(dependencies);
    const { express } = dependencies;

    afterEach(() => sandbox.reset());

    after(() => sandbox.restore());

    describe('setupApp()', () => {

    })
})