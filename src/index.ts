import fastifyPlugin from "fastify-plugin";
import { plugin } from "./plugin";

export type { FastifyGracefulExitOptions } from "./plugin";

export default fastifyPlugin(plugin, {
  fastify: ">=4",
  name: "fastify-graceful-exit",
});
