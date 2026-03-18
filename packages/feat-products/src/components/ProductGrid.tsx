import React from "react";
import type { ProductItem } from "../types";

// ─── ProductCard ──────────────────────────────────────────────────────────────

interface ProductCardProps<T extends ProductItem = ProductItem> {
  product: T;
  onClick?: (product: T) => void;
  onAddToWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
  className?: string;
}

export function ProductCard<T extends ProductItem = ProductItem>({
  product,
  onClick,
  onAddToWishlist,
  isWishlisted,
  className = "",
}: ProductCardProps<T>) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : null;

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => (e.key === "Enter" || e.key === " ") && onClick(product)
          : undefined
      }
      onClick={onClick ? () => onClick(product) : undefined}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        {product.mainImage ? (
          <img
            src={product.mainImage}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-neutral-200" />
        )}
        {discount && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
        {product.isAuction && (
          <span className="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
            Auction
          </span>
        )}
        {onAddToWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product.id);
            }}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-600 shadow transition hover:bg-white hover:text-red-500"
          >
            {isWishlisted ? "♥" : "♡"}
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="line-clamp-2 text-sm font-medium text-neutral-900">
          {product.title}
        </p>
        {product.sellerName && (
          <p className="mt-0.5 text-xs text-neutral-400">
            {product.sellerName}
          </p>
        )}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold text-neutral-900">
            {product.currency ?? "₹"}
            {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-neutral-400 line-through">
              {product.currency ?? "₹"}
              {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        {product.rating !== undefined && (
          <div className="mt-1 flex items-center gap-1">
            <span className="text-xs text-yellow-500">★</span>
            <span className="text-xs text-neutral-500">
              {product.rating.toFixed(1)}
              {product.reviewCount ? ` (${product.reviewCount})` : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ProductCardContext (passed to renderCard slot) ───────────────────────────

export interface ProductCardContext<T extends ProductItem = ProductItem> {
  onClick?: (product: T) => void;
  onWishlistToggle?: (productId: string) => void;
  isWishlisted: boolean;
}

// ─── ProductGrid ──────────────────────────────────────────────────────────────

interface ProductGridProps<T extends ProductItem = ProductItem> {
  products: T[];
  /**
   * Custom card renderer. When provided, replaces the built-in `ProductCard`.
   * Receives the item and a context object with click/wishlist handlers.
   *
   * @example
   * <ProductGrid<ProductDocument>
   *   products={docs}
   *   renderCard={(p, ctx) => (
   *     <MyRichCard product={p} onWishlist={ctx.onWishlistToggle} />
   *   )}
   * />
   */
  renderCard?: (product: T, ctx: ProductCardContext<T>) => React.ReactNode;
  onProductClick?: (product: T) => void;
  onWishlistToggle?: (productId: string) => void;
  wishlistedIds?: Set<string>;
  /** Text shown when the list is empty and no `emptySlot` is provided. */
  emptyLabel?: string;
  /** Replaces the default empty-state paragraph. */
  emptySlot?: React.ReactNode;
  /** Rendered above the grid (e.g. filter bar, heading). */
  headerSlot?: React.ReactNode;
  /** Rendered below the grid (e.g. pagination). */
  footerSlot?: React.ReactNode;
  className?: string;
}

export function ProductGrid<T extends ProductItem = ProductItem>({
  products,
  renderCard,
  onProductClick,
  onWishlistToggle,
  wishlistedIds,
  emptyLabel = "No products found",
  emptySlot,
  headerSlot,
  footerSlot,
  className = "",
}: ProductGridProps<T>) {
  const isEmpty = products.length === 0;

  return (
    <div>
      {headerSlot}
      {isEmpty ? (
        emptySlot ?? (
          <p className="py-12 text-center text-sm text-neutral-500">
            {emptyLabel}
          </p>
        )
      ) : (
        <div
          className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`}
        >
          {products.map((p) => {
            const ctx: ProductCardContext<T> = {
              onClick: onProductClick,
              onWishlistToggle,
              isWishlisted: wishlistedIds?.has(p.id) ?? false,
            };
            return renderCard ? (
              <React.Fragment key={p.id}>{renderCard(p, ctx)}</React.Fragment>
            ) : (
              <ProductCard<T>
                key={p.id}
                product={p}
                onClick={onProductClick}
                onAddToWishlist={onWishlistToggle}
                isWishlisted={ctx.isWishlisted}
              />
            );
          })}
        </div>
      )}
      {footerSlot}
    </div>
  );
}
