const serverFactory = require('./server');
const sinon = require('sinon')

describe('Server', () => {
    const sandbox = sinon.createSandbox();
    const dependencies = {
        app: {
            listen: sandbox.stub(),
            use: () => {},
        },
        envVariables: {
            PORT: 3000,
            NODE_ENV: 'dev',
        },
        morgan: {
            dev: ()=>{}
        },
        logger: {
            fatal: () => {}
        }
    }

    const server = serverFactory(dependencies);

    //const { app } = dependencies;

    beforeEach(() => {
        sandbox.stub(process, 'exit')
    })

    afterEach(() => sandbox.reset());

    //afterAll(() => sandbox.restore());

    describe('start', () => {
        fit('starts up the express server', () => {
            
            const actualServer= server.start();
            console.log('actualServer', actualServer)

            // console.log("app is!!!!", dependencies.app)
            //expect(dependencies.app.listen).to.have.been.called
            //With(dependencies.envVariables.PORT);
        });
 
        it('Logs the port which the server has been started on', () => {

        });
        describe('when the server creation fails', () => {    
            it('shuts down the server', () => {
                app.listen.throws();
                server.start()
                
                // have to mock it out 
                //expect(process.exit).to.have.been.calledWith(1)
            })
        })
    })
})