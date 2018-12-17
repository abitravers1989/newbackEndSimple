const serverFactory = require('./server');
const chai = require('chai');
const sinon = require('sinon');
const { promisify } = require('util');

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
     promisify,
    };

  const server = serverFactory(dependencies);
  const { app } = dependencies;

  before(() => sandbox.stub(process, 'exit'));

  afterEach(() => sandbox.reset());

  after(() => sandbox.restore());

  describe('start()', () => {
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
      //sandbox.reset();
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

     describe('when server creation fails', () => {
       it('exits the process and shuts down', () => {
        // sandbox.reset();
        // sandbox.stub(process, 'exit');
        app.listen.throws();
        server.start();
        expect(process.exit).to.have.been.calledWith(1);
       })
     });
  });

  describe('stop()', () => {
    describe('when the server can be closed successfully', () => {
      it('closes the server', () => {
        const mockExpress = {
          close: sinon.stub().yields(null),
        };
        
        app.listen.returns(mockExpress);
        server.start();
        server.stop();
        expect(mockExpress.close).to.have.been.called;
      })
    })
  });
})