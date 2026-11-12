import type { ProductTranslations } from "../../features/products/translations";

export interface AdminCategoryOption {
  id: string;
  name: string;
}

export interface AdminProductImage {
  id: string;
  url: string;
  alt?: string | null;
  isPrimary: boolean;
  cid: string | null;
}

export interface AdminProductRecord {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  translations: ProductTranslations;
  tags: string[];
  priceMinor: number;
  originalPriceMinor: number | null;
  discountPercent: string | null;
  isOnPromotion: boolean;
  isFeaturedBestSeller: boolean;
  isAvailable: boolean;
  sortOrder: number;
  categories: Array<{ category: AdminCategoryOption }>;
  images: AdminProductImage[];
  createdAt: string;
}