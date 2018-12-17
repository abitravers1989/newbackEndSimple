const serverFactory = require('./server');
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('server', () => {
  const sandbox = sinon.createSandbox();
  const dependencies = {
    app: {
      listen: sandbox.stub(),
      use: sandbox.stub(),
     },
     envVariables: {
       PORT: 3000,
       NODE_ENV: 'dev',
     },
     morgan: ()=>{},
     logger: {
       info: () => {},
       fatal: () => {},
     },
    };

  const server = serverFactory(dependencies);
  const { app } = dependencies;

  before(() => {
    sandbox.stub(process, 'exit')
  })
  after(() => sandbox.reset());

  describe('start', () => {
    let actualServer;
    const mockExpress = {
      address: () => ({
        PORT: dependencies.envVariables.PORT,
      }),
    };

    beforeEach(() => {
      console.log('app.listen0', app.listen)
      app.listen.returns(mockExpress);
      console.log('app.listen1', app.listen)
      actualServer = server.start();
      app.listen.yield();
      console.log('app.listen2', app.listen)
    })

    it('starts up the express server', () => {
      console.log('app.listen3', app.listen)
      expect().to.have.been.called()
      console.log('app.listen4', app.listen)
      
      //expect(app.listen).to.have.been.calledWith(dependencies.envVariables.PORT);
     });
 
    //  it('Logs the port which the server has been started on', () => {

    //  });
    //  describe('when the server creation fails', () => {    
    //    it('shuts down the server', () => {
    //      app.listen.throws();
    //      server.start()
                
    //             // have to mock it out 
    //             //expect(process.exit).to.have.been.calledWith(1)
    //     })
    //  })
  })
})