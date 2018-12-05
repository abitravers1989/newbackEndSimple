const serverFactory = require('./server');
const sinon = require('sinon')

describe('Server', () => {
    const sandbox = sinon.createSandbox();
    const dependencies = {
        app: {
            listen: sandbox.stub(),
            on: sandbox.stub(),
            emit: () => {},
        },
        logger: {
            info: () => {},
            error: () => {},
        },
        envVariables: {
            PORT: 3000,
        },
        process: {
            exit: () => {}
        }
    }

    const server = serverFactory(dependencies);

    const { app } = dependencies;

    afterEach(() => sandbox.reset());

    afterAll(() => sandbox.restore());

    describe('start', () => {
        it('starts up the express server', () => {
            const app =  {
                listen: sandbox.stub(),
                on: sandbox.stub(),
                emit: () => {},
            }

            const mockExpressServer = () => {
                return () => {
                    return app
                }
            }

            server.start();
            expect(app.listen).to.have.been.called
        });
        it('emits a listened event', () => {

        });
        it('prints to the console when it hears that event', () => {

        });
        describe('throws an error if something went wrong', () => {
            it('loggs the error', () => {

            })
            it('shuts down gracefully', () => {
                
            })
        })
    })
})