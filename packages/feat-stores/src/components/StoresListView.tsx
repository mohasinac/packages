import React from "react";
import type { LayoutSlots } from "@mohasinac/contracts";
import type { StoreListItem } from "../types";

interface StoreCardProps {
  store: StoreListItem;
  labels?: { products?: string; reviews?: string; sold?: string };
  className?: string;
}

function StoreCard({ store, labels = {}, className = "" }: StoreCardProps) {
  return (
    <a
      href={`/stores/${store.storeSlug}`}
      className={`block rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {store.storeBannerURL ? (
        <div className="h-24 overflow-hidden bg-gray-100">
          <img
            src={store.storeBannerURL}
            alt={`${store.storeName} banner`}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="h-24 bg-gradient-to-br from-orange-50 to-orange-100" />
      )}
      <div className="px-4 pb-4">
        <div className="-mt-6 mb-3">
          {store.storeLogoURL ? (
            <img
              src={store.storeLogoURL}
              alt={store.storeName}
              className="h-12 w-12 rounded-lg border-2 border-white object-cover shadow-sm"
            />
          ) : (
            <div className="h-12 w-12 rounded-lg border-2 border-white bg-orange-100 flex items-center justify-center text-orange-600 font-bold shadow-sm">
              {store.storeName[0]?.toUpperCase()}
            </div>
          )}
        </div>
        <h3 className="font-semibold text-gray-900 text-sm truncate">
          {store.storeName}
        </h3>
        {store.storeDescription && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
            {store.storeDescription}
          </p>
        )}
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
          {store.totalProducts != null && (
            <span>
              {store.totalProducts} {labels.products ?? "products"}
            </span>
          )}
          {store.itemsSold != null && (
            <span>
              {store.itemsSold} {labels.sold ?? "sold"}
            </span>
          )}
          {store.averageRating != null && (
            <span>★ {store.averageRating.toFixed(1)}</span>
          )}
        </div>
      </div>
    </a>
  );
}

interface StoresListViewProps<T extends StoreListItem = StoreListItem> {
  stores: T[];
  labels?: {
    products?: string;
    reviews?: string;
    sold?: string;
    empty?: string;
  };
  total?: number;
  currentPage?: number;
  totalPages?: number;
  className?: string;
  /** Render-prop slot overrides — pass via `FeatureExtension.slots`. */
  slots?: LayoutSlots<T>;
}

export function StoresListView<T extends StoreListItem = StoreListItem>({
  stores,
  labels = {},
  total = 0,
  currentPage = 1,
  totalPages = 1,
  className = "",
  slots,
}: StoresListViewProps<T>) {
  if (stores.length === 0) {
    if (slots?.renderEmptyState) {
      return <>{slots.renderEmptyState() as React.ReactNode}</>;
    }
    return (
      <p className="text-center text-gray-500 py-12">
        {labels.empty ?? "No stores found."}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {slots?.renderHeader
        ? (slots.renderHeader({ total }) as React.ReactNode)
        : null}
      <div
        className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`}
      >
        {stores.map((store, i) =>
          slots?.renderCard ? (
            <React.Fragment key={store.id}>
              {slots.renderCard(store, i) as React.ReactNode}
            </React.Fragment>
          ) : (
            <StoreCard key={store.id} store={store as StoreListItem} labels={labels} />
          ),
        )}
      </div>
      {slots?.renderFooter
        ? (slots.renderFooter({ page: currentPage, totalPages }) as React.ReactNode)
        : null}
    </div>
  );
}
