import type { FastifyPluginAsync } from 'fastify';

export type FastifyGracefulExitOptions = {
  logBindings?: Record<string, unknown>;
  timeout?: number;
};

export const plugin: FastifyPluginAsync<FastifyGracefulExitOptions> = async (fastify, options = {}): Promise<void> => {
  const { logBindings = { plugin: 'fastify-graceful-exit' }, timeout = 3000 } = options;
  const { log } = fastify;
  let closePromise: ReturnType<typeof fastify.close> | null = null;
  // Gracefully close
  const gracefullyClose = async (signal: string) => {
    if (closePromise) {
      return closePromise;
    }
    log.warn(logBindings, `Fastify is gracefully closing from signal="${signal}" ...`);
    // Exit after a 3s timeout
    setTimeout(() => {
      log.warn(logBindings, `Failed to gracefully close before timeout`);
      process.exit(1);
    }, timeout);
    closePromise = fastify.close();
    await closePromise;
    process.exit(0);
  };
  process.on('uncaughtException', gracefullyClose);
  process.on('unhandledRejection', gracefullyClose);
  process.on('SIGTERM', gracefullyClose);
  // Handle Ctrl+C
  process.on('SIGINT', gracefullyClose);
  // Handle nodemon-like restarts
  process.on('SIGUSR2', gracefullyClose);
};
