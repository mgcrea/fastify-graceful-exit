import type { FastifyInstance } from "fastify";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildFastify } from "../fixtures";

// vi.mock("process", () => {
//   const Process = vi.fn();
//   Process.prototype.exit = vi.fn();

//   return {
//     exit: vi.fn(),
//   };
// });

describe("with fastify path", () => {
  let fastify: FastifyInstance;
  const exitMock = vi.spyOn(process, "exit").mockImplementation((code) => {
    console.log(`Exited with ${code}`);
    return undefined as never;
  });

  beforeEach(async () => {
    fastify = buildFastify({});
    await fastify.ready();
    await fastify.listen({ port: 3000 });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should properly call exit on SIGTERM", async () => {
    process.kill(process.pid, "SIGTERM");
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(exitMock).toHaveBeenCalledWith(0);
  });
  it("should properly call exit on SIGINT", async () => {
    process.kill(process.pid, "SIGINT");
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(exitMock).toHaveBeenCalledWith(0);
  });
  it("should properly call exit on SIGUSR2", async () => {
    process.kill(process.pid, "SIGUSR2");
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(exitMock).toHaveBeenCalledWith(0);
  });
});
