import Fastify from "fastify";

const app = Fastify({ logger: true });
const port = Number(process.env.API_PORT ?? 4000);

app.get("/health", async () => ({
  status: "ok",
  service: "brand-api"
}));

await app.listen({
  port,
  host: "0.0.0.0"
});
