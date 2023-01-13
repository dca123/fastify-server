import fastify from "fastify";

const server = fastify({
  logger: true,
});

server.get("/", async (request, reply) => {
  return { healthy: true, version: "1.0.0" };
});

server.listen({
  port: 3000,
}, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
