"use client";

import React from "react";
import type { CollectionListItem } from "../types";

interface CollectionCardProps {
  collection: CollectionListItem;
  href: string;
}

export function CollectionCard({ collection, href }: CollectionCardProps) {
  return (
    <a
      href={href}
      className="group relative block overflow-hidden rounded-xl bg-gray-100 transition-shadow hover:shadow-lg"
    >
      {collection.image ? (
        <img
          src={collection.image}
          alt={collection.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="h-48 w-full bg-gradient-to-br from-indigo-100 to-purple-100" />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{collection.title}</h3>
        {collection.subtitle && (
          <p className="mt-1 text-sm text-gray-500">{collection.subtitle}</p>
        )}
        {collection.productCount !== undefined && (
          <p className="mt-2 text-xs text-gray-400">
            {collection.productCount} {collection.productCount === 1 ? "item" : "items"}
          </p>
        )}
      </div>
    </a>
  );
}

interface CollectionGridProps {
  collections: CollectionListItem[];
  getHref: (slug: string) => string;
}

export function CollectionGrid({ collections, getHref }: CollectionGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map((c) => (
        <CollectionCard key={c.slug} collection={c} href={getHref(c.slug)} />
      ))}
    </div>
  );
}
