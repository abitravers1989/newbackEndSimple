const serverFactory = require('./server');
const sinon = require('sinon')

describe('Server', () => {
    const sandbox = sinon.createSandbox();
    const dependencies = {
        app: {
            listen: sandbox.stub(),
            on: sandbox.stub(),
        },
        envVariables: {
            PORT: 3000,
            NODE_ENV: 'dev',
        },
        morgan: {
            'dev': ()=>{}
        },
        logger: {
            fatal: () => {}
        }
    }

    const server = serverFactory(dependencies);

    const { app } = dependencies;

    beforeEach(() => {
        sandbox.stub(process, 'exit')
    })

    afterEach(() => sandbox.reset());

    //afterAll(() => sandbox.restore());

    describe('start', () => {
       // let actualServer;
        const mockExpress = {
          address: () => ({
            PORT: dependencies.envVariables.PORT,
          }),
        };
    
        beforeEach(() => {
          app.listen.returns(mockExpress);
          console.log('app.listen', app.listen)
          server.start();
          console.log('actualServer:  ', server)
          //app.listen.yield();
        });
        fit('starts up the express server', () => {
            //server.start();
            console.log("app is!!!!", app.listen)
            expect(app.listen).to.have.been.calledWith(dependencies.envVariables.PORT);
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