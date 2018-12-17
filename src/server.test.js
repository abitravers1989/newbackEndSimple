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

  // beforeEach(() => {
  //   sandbox.stub(process, 'exit')
  // })
  afterEach(() => sandbox.reset());

  describe('start', () => {
    const mockExpress = {
      address: () => ({
        PORT: dependencies.envVariables.PORT,
      }),
    };
//Before hooks not working mocha and chai   !!!!!!!!!
    // before(() => {
    //   app.listen.returns(mockExpress);
    //   let actualServer;
    //   actualServer = server.start();
    //   app.listen.yield(); 
    // })
    it('starts up the express server on the coprrect port', () => {
      sandbox.reset();
      app.listen.returns(mockExpress);
      let actualServer;
      actualServer = server.start();
      app.listen.yield(); 
      expect(app.listen).to.have.been.calledWith(dependencies.envVariables.PORT);   
     });

     it('returns a server object', () => {
      app.listen.returns(mockExpress);
      let actualServer;
      actualServer = server.start();
      app.listen.yield(); 
      expect(actualServer).to.equal(mockExpress);
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