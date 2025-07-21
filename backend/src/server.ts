import { fastify } from "fastify";
import { app as App } from "./app.ts";

const PORT = Number(process.env.PORT!) || 3000;

if (!PORT) {
  throw new Error("PORT is not set");
}

const server = fastify();

App(server, { logger: true });

server
  .listen({ port: PORT, host: "0.0.0.0" })
  .then(() => {
    console.log(`Server is running on *:${PORT}`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
