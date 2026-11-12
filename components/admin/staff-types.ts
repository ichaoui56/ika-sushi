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
  | "MANAGE_EMPLOYEES"
  | "VIEW_EMPLOYEES";

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

export interface AdminStaffActivity {
  id: string;
  kind: "status" | "assignment";
  createdAt: string;
  reference: string;
  customerName: string;
  locationName: string;
  note: string | null;
  previousStatus?: string | null;
  nextStatus?: string;
  previousPerson?: string | null;
  nextPerson?: string | null;
  changedBy?: string | null;
}

export interface AdminStaffDetails {
  user: AdminStaffRecord;
  activity: AdminStaffActivity[];
  deliveryStatistics?: {
    lifetimeAssignments: number;
    currentAssignments: number;
    currentByStatus: Array<{ status: string; count: number }>;
    deliveredByUser: number;
    failedByUser: number;
    statusUpdatesByUser: number;
  };
  currentDeliveries?: Array<{
    id: string;
    reference: string;
    customerName: string;
    customerPhone: string;
    locationName: string;
    status: string;
    totalMinor: number;
    currency: string;
    assignedAt: string;
  }>;
}
