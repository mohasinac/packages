import React from "react";
import type { CategoryItem } from "../types";

interface ConcernCardProps {
  concern: CategoryItem;
  onClick?: (concern: CategoryItem) => void;
  className?: string;
}

export function ConcernCard({ concern, onClick, className = "" }: ConcernCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(concern)}
      className={`group flex flex-col items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-sm transition hover:border-primary hover:shadow-md ${className}`}
    >
      {concern.display?.coverImage && (
        <img
          src={concern.display.coverImage}
          alt={concern.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover"
        />
      )}
      <div>
        <p className="text-sm font-semibold text-neutral-900 group-hover:text-primary">
          {concern.name}
        </p>
        {concern.description && (
          <p className="mt-1 text-xs text-neutral-500 line-clamp-2">
            {concern.description}
          </p>
        )}
      </div>
    </button>
  );
}
