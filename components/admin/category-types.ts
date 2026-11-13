import type { CategoryTranslations } from "../../features/categories/translations";

export interface AdminCategoryPage {
  id: string;
  name: string;
  translations: CategoryTranslations;
  slug: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  _count: { products: number };
}
