const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
chai.use(require('sinon-chai'));

const serverFactory = require('./server');
const { promisify } = require('util');

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
       info: sandbox.stub(),
       error: sandbox.stub(),
     },
     routes: {
      setupEndpoints: () => {}
     },
     //bodyParser: () => {},
     mongoose: {
      connect: () => {},
      set: () => {},
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
//Before hooks not working chai
    it('starts up the express server on the correct port', () => {
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
      expect(dependencies.logger.info).to.have.been.called;
     });

     describe('when server creation fails', () => {
       it('exits the process and shuts down', () => {
        app.listen.throws();
        server.start();
        expect(process.exit).to.have.been.calledWith(1);
        expect(dependencies.logger.error).to.have.been.called;
       })
     });
  });

  describe('stop()', () => {
    const mockExpress = {
      close: sinon.stub().yields(null),
    }; 
    describe('when the server can be closed successfully', () => {
      it('closes the server', async () => {
        app.listen.returns(mockExpress);
        server.start();
        await server.stop();
        expect(mockExpress.close).to.have.been.called;
        expect(dependencies.logger.info).to.have.been.called;
      })
    });

    describe('when the server cannot be closes successfully', () => {
      it('exits the process', async () => {
        const error = new Error('error');
        mockExpress.close.yields(error);
        server.start();
        await server.stop();
        expect(process.exit).to.have.been.calledWith(1);
        expect(dependencies.logger.error).to.have.been.called;
      });
    })
  });
})