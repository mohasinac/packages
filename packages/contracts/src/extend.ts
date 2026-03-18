/**
 * Utility types for schema/type extensibility across feat-* packages.
 *
 * These generic helpers allow consuming apps to flow their own richer domain
 * types through the standard package hooks and components without forking.
 *
 * Usage pattern (in consuming app):
 *
 *   // 1. Extend the package's base interface
 *   interface ProductDocument extends ProductItem {
 *     brand: string;
 *     auctionEndDate?: string;
 *   }
 *
 *   // 2. Pass Generic + transform to the hook
 *   const { products } = useProducts<ProductDocument>(params, {
 *     transform: (raw) => ({ ...raw, brand: raw.attributes?.brand ?? "" }),
 *   });
 *
 *   // 3. Pass Generic + renderCard to the component
 *   <ProductGrid<ProductDocument>
 *     products={products}
 *     renderCard={(p, ctx) => <MyRichProductCard product={p} {...ctx} />}
 *   />
 */

/**
 * Options mixin for hooks that support an optional per-item transform.
 * The transform maps the API's base type to a richer app-level type.
 */
export interface WithTransformOpts<Base, Target extends Base = Base> {
  /**
   * Map each API item (BaseType) to a richer app-level type (Target).
   * Called once per item after the query resolves.
   */
  transform?: (item: Base) => Target;
}

/**
 * Convenience helper: build a response type for list endpoints that mirrors
 * the package's standard list-response shape but with a generic item type.
 */
export interface GenericListResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize?: number;
  perPage?: number;
  totalPages: number;
  hasMore?: boolean;
}
