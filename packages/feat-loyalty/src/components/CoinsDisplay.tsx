"use client";

import React from "react";

interface CoinsBadgeProps {
  coins: number;
  className?: string;
}

export function CoinsBadge({ coins, className }: CoinsBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 ${className ?? ""}`}
    >
      <span aria-hidden="true">🪙</span>
      {coins.toLocaleString()}
    </span>
  );
}

interface CoinsDisplayProps {
  coins: number;
  label?: string;
}

export function CoinsDisplay({ coins, label = "HC Coins" }: CoinsDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-3xl font-bold text-amber-600">{coins.toLocaleString()}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
