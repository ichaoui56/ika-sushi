export type StaffRole = "EMPLOYEE" | "DELIVERY";
export type StaffStatus = "ACTIVE" | "DISABLED";
export type StaffPermission =
  | "VIEW_ORDERS"
  | "MANAGE_ORDERS"
  | "VIEW_PRODUCTS"
  | "MANAGE_PRODUCTS"
  | "VIEW_CUSTOMERS"
  | "MANAGE_CUSTOMERS"
  | "VIEW_DELIVERY"
  | "MANAGE_DELIVERY"
  | "VIEW_CATEGORIES"
  | "MANAGE_CATEGORIES"
  | "VIEW_REPORTS"
  | "MANAGE_HERO"
  | "MANAGE_SETTINGS"
  | "MANAGE_EMPLOYEES";

export interface AdminStaffRecord {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  role: StaffRole;
  status: StaffStatus;
  createdAt: string;
  permissions: Array<{ permission: StaffPermission }>;
  deliveryAssignmentCount: number;
}
