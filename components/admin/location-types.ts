export type LocationType = "CITY" | "NEIGHBORHOOD" | "STREET";

export interface AdminLocationRecord {
  id: string;
  name: string;
  slug: string;
  type: LocationType;
  parentId: string | null;
  deliveryAvailable: boolean;
  deliveryFeeMinor: number;
  minimumOrderMinor: number;
  estimatedMinutes: number | null;
  isActive: boolean;
  sortOrder: number;
  _count: { children: number; addresses: number; orders: number };
}
