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

  const candidate =
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof error.statusCode === "number"
      ? error.statusCode
      : 500;

  const status = candidate >= 400 ? candidate : 500;
  const message = error instanceof Error ? error.message : "Request failed";

  reply.code(status).send({
    error: status >= 500 ? "Internal server error" : message
  });
});

await app.listen({
  port,
  host: "0.0.0.0"
});
