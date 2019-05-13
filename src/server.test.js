const serverFactory = require('./server');

describe('server', () => {
  const sandbox = sinon.createSandbox();

  const dependencies = {
    app: {
      listen: sandbox.stub(),
    },
    envVariables: {
      PORT: 3000,
    },
    logger: {
      info: sinon.spy(),
      error: sinon.spy(),
    },
    middleware: {
      init: sandbox.stub().resolves({}),
    },
    routes: {
      setupEndpoints: sinon.spy(),
    },
  };

  const { app, middleware, envVariables, logger, routes } = dependencies;
  const server = serverFactory(dependencies);

  before(() => sandbox.stub(process, 'exit'));

  afterEach(() => sandbox.reset());

  after(() => sandbox.restore());

  describe('start', () => {
    let actualServer;
    const mockExpress = {
      address: () => ({
        PORT: envVariables.PORT,
      }),
    };

    beforeEach(() => {
      server.start();
    });

    it('initializes middleware', () => {
      expect(middleware.init).to.have.been.called;
    });

    it('sets up the app routes', () => {
      expect(routes.setupEndpoints).to.have.been.called;
    });

    it('creates an express server on the correct port', () => {
      expect(app.listen).to.have.been.calledWith(envVariables.PORT);
    });

    it('returns a server object', () => {
      app.listen.returns(mockExpress);
      actualServer = server.start();
      expect(actualServer).to.equal(mockExpress);
    });

    it('logs the server start', () => {
      app.listen.returns(mockExpress);
      server.start();
      app.listen.yield();

      expect(logger.info).to.have.been.called;
    });

    describe('when server creation fails', () => {
      beforeEach(() => {
        app.listen.throws();
        server.start();
        expect(process.exit).to.have.been.calledWith(1);
        expect(logger.error).to.have.been.called;
      });
    });
  });

  describe('stop', () => {
    const mockExpress = {
      close: sandbox.stub().returns(null),
    };

    describe('when the server can be closed successfully', () => {
      it('closes the server', () => {
        app.listen.returns(mockExpress);
        server.start();
        server.stop();
        expect(mockExpress.close).to.have.been.called;
        expect(logger.info).to.have.been.called;
      });

      describe('when the server cannot be closed successfully', () => {
        it('exits the process', () => {
          const error = new Error('error');
          mockExpress.close.returns(error);
          server.start();
          server.stop();
          expect(process.exit).to.have.been.calledWith(1);
          expect(logger.error).to.have.been.called;
        });
      });
    });
  });
});
