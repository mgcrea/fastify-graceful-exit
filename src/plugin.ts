/* eslint-disable @typescript-eslint/no-misused-promises */
import type { FastifyPluginAsync } from "fastify";

export type FastifyGracefulExitOptions = {
  logBindings?: Record<string, unknown>;
  timeout?: number;
};

export const plugin: FastifyPluginAsync<FastifyGracefulExitOptions> = async (
  fastify,
  options = {},
  // eslint-disable-next-line @typescript-eslint/require-await
): Promise<void> => {
  const { logBindings = { plugin: "fastify-graceful-exit" }, timeout = 3000 } = options;
  const { log } = fastify;
  let closePromise: Promise<undefined> | null = null;
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
  process.on("uncaughtException", async (err) => {
    log.error({ err }, `Uncaught Exception: ${err.message}`);
    await gracefullyClose("uncaughtException");
  });
  process.on("unhandledRejection", async (reason, _promise) => {
    log.error({ reason }, `Unhandled Rejection: ${String(reason)}`);
    await gracefullyClose("unhandledRejection");
  });
  process.on("SIGTERM", gracefullyClose);
  // Handle Ctrl+C
  process.on("SIGINT", gracefullyClose);
  // Handle nodemon-like restarts
  process.on("SIGUSR2", gracefullyClose);
};
