import type { FastifyPluginAsync } from 'fastify';

export type FastifyGracefulExitOptions = {
  logBindings?: Record<string, unknown>;
  timeout?: number;
};

export const plugin: FastifyPluginAsync<FastifyGracefulExitOptions> = async (fastify, options = {}): Promise<void> => {
  const { logBindings = { plugin: 'fastify-graceful-exit' }, timeout = 3000 } = options;
  const { log } = fastify;
  // Gracefully close
  const gracefullyClose = async (signal: string) => {
    log.warn(logBindings, `Fastify is gracefully closing from signal="${signal}" ...`);
    // Exit after a 3s timeout
    setTimeout(() => {
      log.warn(logBindings, `Failed to gracefully close before timeout`);
      process.exit(1);
    }, timeout);
    await fastify.close();
    process.exit(0);
  };
  process.once('SIGTERM', gracefullyClose);
  // Handle Ctrl+C
  process.once('SIGINT', gracefullyClose);
  // Handle nodemon-like restarts
  process.once('SIGUSR2', gracefullyClose);
};
