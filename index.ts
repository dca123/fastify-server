import fastify from "fastify";
import * as dotenv from 'dotenv'
dotenv.config()

const server = fastify({
  logger: true,
});

server.get("/", async (request, reply) => {
  return { healthy: true, version: "1.0.0", secret: process.env.SECRET };
});

const port = process.env.PORT ?? 3000;
server.listen({
  port: Number(port)
}, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
