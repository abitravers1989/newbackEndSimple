const { server } = require('../../src/container');

before(async () => {
  global.app = await server.start();
});

after(async () => {
  await server.stop();
});
