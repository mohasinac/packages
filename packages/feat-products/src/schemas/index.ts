import { z } from "zod";

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

export const productImageSchema = z.object({
  url: z.string(),
  thumbnailUrl: z.string().optional(),
  alt: z.string().optional(),
  order: z.number().optional(),
});

export const productSeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

// ─── Base item schema ─────────────────────────────────────────────────────────

/**
 * Base Zod schema for a product item.
 * Apps can extend this to add their own fields:
 *
 * @example
 * import { productItemSchema } from "@mohasinac/feat-products";
 *
 * const myProductSchema = productItemSchema.extend({
 *   brand: z.string(),
 *   auctionEndDate: z.string().optional(),
 * });
 * type MyProduct = z.infer<typeof myProductSchema>;
 */
export const productItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.number(),
  originalPrice: z.number().optional(),
  currency: z.string().optional(),
  mainImage: z.string().optional(),
  images: z.array(productImageSchema).optional(),
  category: z.string().optional(),
  categorySlug: z.string().optional(),
  sellerId: z.string().optional(),
  sellerName: z.string().optional(),
  sellerAvatar: z.string().optional(),
  status: z.enum(["draft", "published", "archived", "sold"]),
  condition: z
    .enum(["new", "like_new", "good", "fair", "poor"])
    .optional(),
  listingType: z.enum(["fixed", "auction"]).optional(),
  isAuction: z.boolean().optional(),
  isPreOrder: z.boolean().optional(),
  inStock: z.boolean().optional(),
  stockCount: z.number().optional(),
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
  tags: z.array(z.string()).optional(),
  attributes: z.record(z.string()).optional(),
  seo: productSeoSchema.optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),
});

/** Base Zod schema for list-query parameters. */
export const productListParamsSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(["draft", "published", "archived", "sold"]).optional(),
  condition: z
    .enum(["new", "like_new", "good", "fair", "poor"])
    .optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  inStock: z.coerce.boolean().optional(),
  isAuction: z.coerce.boolean().optional(),
  sellerId: z.string().optional(),
  sort: z.string().optional(),
  page: z.coerce.number().optional(),
  perPage: z.coerce.number().optional(),
  featured: z.coerce.boolean().optional(),
});
