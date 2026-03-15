export interface PreorderItem {
  id: string;
  name: string;
  slug: string;
  images: string[];
  salePrice: number;
  regularPrice: number;
  franchise: string;
  brand: string;
  description: string;
  preorderShipDate?: string;
  isFeatured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PreorderStatus = "available" | "shipping_soon" | "shipped";

export function getPreorderStatus(shipDate: string | undefined): PreorderStatus {
  if (!shipDate) return "available";
  const ship = new Date(shipDate);
  const now = new Date();
  const diffDays = Math.ceil((ship.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "shipped";
  if (diffDays <= 14) return "shipping_soon";
  return "available";
}
