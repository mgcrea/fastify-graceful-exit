import { buildFastify } from 'test/fixtures';

describe('with fastify path', () => {
  const fastify = buildFastify({});
  beforeAll(async () => {
    await fastify.ready();
    await fastify.listen(3000);
  });
  // afterAll(() => {
  //   fastify.close();
  // });
  it('should properly log a GET request', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    process.kill(process.pid, 'SIGTERM');
  });
});
