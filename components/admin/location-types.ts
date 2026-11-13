import type { LocationTranslations } from "../../features/locations/translations";

export interface AdminLocationRecord {
  id: string;
  name: string;
  translations: LocationTranslations;
  slug: string;
  deliveryAvailable: boolean;
  deliveryFeeMinor: number;
  minimumOrderMinor: number;
  estimatedMinutes: number | null;
  isActive: boolean;
  sortOrder: number;
  _count: { addresses: number; orders: number };
}
