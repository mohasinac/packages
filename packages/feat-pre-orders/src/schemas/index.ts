import { z } from "zod";

export const preOrderStatusSchema = z.enum([
  "pending",
  "confirmed",
  "in_production",
  "ready",
  "shipped",
  "delivered",
  "cancelled",
]);

/**
 * Base Zod schema for a pre-order item.
 *
 * @example
 * import { preOrderItemSchema } from "@mohasinac/feat-pre-orders";
 *
 * const mySchema = preOrderItemSchema.extend({
 *   customAttributes: z.record(z.string()).optional(),
 * });
 */
export const preOrderItemSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  customerEmail: z.string().email(),
  customerName: z.string(),
  productId: z.string(),
  productTitle: z.string(),
  quantity: z.number().int().positive(),
  unitPrice: z.number(),
  currency: z.string().default("INR"),
  totalAmount: z.number(),
  status: preOrderStatusSchema.default("pending"),
  estimatedFulfillmentDate: z.string().optional(),
  depositPaid: z.boolean().default(false),
  depositAmount: z.number().optional(),
  sellerId: z.string().optional(),
  createdAt: z.string().optional(),
});

export const preOrderListParamsSchema = z.object({
  status: preOrderStatusSchema.optional(),
  customerId: z.string().optional(),
  productId: z.string().optional(),
  page: z.number().int().positive().default(1),
  perPage: z.number().int().positive().default(20),
});
