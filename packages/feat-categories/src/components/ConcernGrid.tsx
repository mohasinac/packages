import React from "react";
import type { CategoryItem } from "../types";
import { ConcernCard } from "./ConcernCard";

interface ConcernGridProps {
  concerns: CategoryItem[];
  onSelect?: (concern: CategoryItem) => void;
  className?: string;
}

export function ConcernGrid({ concerns, onSelect, className = "" }: ConcernGridProps) {
  if (concerns.length === 0) return null;

  return (
    <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 ${className}`}>
      {concerns.map((concern) => (
        <ConcernCard key={concern.id} concern={concern} onClick={onSelect} />
      ))}
    </div>
  );
}
