export type CategoryType = "category" | "concern" | "collection" | "brand";

export interface CategorySeo {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}

export interface CategoryDisplay {
  icon?: string;
  coverImage?: string;
  showInMenu?: boolean;
}

export interface CategoryMetrics {
  productCount: number;
  totalItemCount: number;
  lastUpdated?: string;
}

export interface CategoryItem {
  id: string;
  type?: CategoryType;
  name: string;
  slug: string;
  description?: string;
  rootId?: string;
  parentIds?: string[];
  childrenIds?: string[];
  tier: number;
  path?: string;
  order?: number;
  isLeaf?: boolean;
  metrics?: CategoryMetrics;
  isFeatured?: boolean;
  featuredPriority?: number;
  /** @deprecated Use type === "brand" */ isBrand?: boolean;
  seo?: CategorySeo;
  display?: CategoryDisplay;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoriesResponse {
  items: CategoryItem[];
  total: number;
}

// Concerns, collections, and brands are all categories with a type discriminator.
export type Concern = CategoryItem;
export type ConcernListResponse = CategoriesResponse;
