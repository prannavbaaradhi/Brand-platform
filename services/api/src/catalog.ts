import type { FastifyInstance } from "fastify";
import { publicDb } from "./supabase";

export async function registerCatalogRoutes(app: FastifyInstance) {
  app.get("/catalog/products", async (request) => {
    const query = request.query as { featured?: string };

    let builder = publicDb
      .from("products")
      .select(
        "id, slug, name, subtitle, description, base_price, currency, production_lead_days, is_featured, product_variants(id, size, color, price_override, sort_order), product_images(id, image_url, alt_text, position)"
      )
      .order("created_at", { ascending: false });

    if (query.featured === "true") {
      builder = builder.eq("is_featured", true);
    }

    const { data, error } = await builder;
    if (error) throw error;
    return { products: data };
  });

  app.get("/catalog/products/:slug", async (request, reply) => {
    const { slug } = request.params as { slug: string };

    const { data, error } = await publicDb
      .from("products")
      .select(
        "id, slug, name, subtitle, description, base_price, currency, production_lead_days, is_featured, product_variants(id, size, color, price_override, sort_order), product_images(id, image_url, alt_text, position)"
      )
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) return reply.code(404).send({ error: "Product not found" });
    return { product: data };
  });

  app.get("/catalog/collections", async () => {
    const { data, error } = await publicDb
      .from("collections")
      .select(
        "id, slug, name, description, hero_image_url, sort_order, collection_products(position, products(id, slug, name, subtitle, base_price, currency, product_images(image_url, alt_text, position)))"
      )
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return { collections: data };
  });

  app.get("/catalog/lookbooks", async () => {
    const { data, error } = await publicDb
      .from("lookbooks")
      .select(
        "id, slug, title, description, cover_image_url, published_at, lookbook_items(id, image_url, alt_text, caption, position, product_id)"
      )
      .order("published_at", { ascending: false });

    if (error) throw error;
    return { lookbooks: data };
  });

  app.get("/content/homepage", async () => {
    const { data, error } = await publicDb
      .from("site_content")
      .select("value, updated_at")
      .eq("key", "homepage")
      .maybeSingle();

    if (error) throw error;
    return { content: data?.value ?? {} };
  });
}
