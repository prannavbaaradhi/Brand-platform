import Fastify from "fastify";
import { registerCatalogRoutes } from "./catalog";
import { registerDiscountRoutes } from "./discounts";

const app = Fastify({
  logger: true,
  bodyLimit: 1024 * 1024
});

const port = Number(process.env.API_PORT ?? 4000);

app.get("/health", async () => ({
  status: "ok",
  service: "brand-api"
}));

await registerCatalogRoutes(app);
await registerDiscountRoutes(app);

app.setErrorHandler((error, request, reply) => {
  request.log.error(error);
  const status = error.statusCode && error.statusCode >= 400 ? error.statusCode : 500;

  reply.code(status).send({
    error: status >= 500 ? "Internal server error" : error.message
  });
});

await app.listen({
  port,
  host: "0.0.0.0"
});
