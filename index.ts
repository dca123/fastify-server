import fastify from "fastify";
import { db } from "./db";
const server = fastify({
  logger: true,
});

server.get("/", async (request, reply) => {
  return { healthy: true };
});

server.get("/users", async (request, reply) => {
  const users = await db.user.findMany();
  reply.send({ users });
});
server.get<{
  Params: {
    id: string;
  };
}>("/users/:id", async (request, reply) => {
  const { id } = request.params;
  const user = await db.user.findFirst({
    where: {
      id,
    },
  });
  if (!user) {
    reply.send({ error: "user not found" });
  } else {
    reply.send({ user });
  }
});

server.post<{
  Body: {
    name: string;
    email: string;
  };
}>("/users", async (request, reply) => {
  const { name, email } = request.body;
  const user = await db.user.create({
    data: {
      name,
      email,
    },
  });
  reply.send({ user });
});

server.listen({
  port: 3000,
}, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
