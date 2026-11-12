import { notFound } from "next/navigation";
import StaffForm from "../StaffForm";
import type { AdminStaffRecord, StaffRole, StaffStatus } from "../staff-types";
import { getStaffUser } from "../../../features/staff/queries";
import { requirePermission } from "../../../lib/auth/permissions";

export default async function AdminNewEmployeePage({ searchParams }: { searchParams?: Promise<{ edit?: string }> }) {
  await requirePermission("MANAGE_EMPLOYEES");
  const params = await searchParams;
  const record = params?.edit ? await getStaffUser(params.edit) : null;
  if (params?.edit && !record) notFound();

  const user: AdminStaffRecord | undefined = record ? {
    id: record.id,
    name: record.name,
    phone: record.phone,
    email: record.email,
    role: record.role as StaffRole,
    status: record.status as StaffStatus,
    createdAt: record.createdAt.toISOString(),
    permissions: record.permissions as AdminStaffRecord["permissions"],
    deliveryAssignmentCount: record._count.deliveryAssignments,
  } : undefined;

  return <StaffForm user={user} />;
}
