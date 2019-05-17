const { server, envVariables } = require('../../src/container');

before(async () => {
  envVariables.NODE_ENV = 'test'
  global.app = await server.start();
});

after(async () => {
  await server.stop();
});
