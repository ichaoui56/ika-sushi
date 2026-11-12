import StaffManager from "../StaffManager";
import type { StaffRole, StaffStatus } from "../staff-types";
import { getStaffUserPage } from "../../../features/staff/queries";

interface StaffSearchParams {
  page?: string | string[];
  view?: string | string[];
  q?: string | string[];
}

export default async function AdminEmployeesPage({ searchParams }: { searchParams: Promise<StaffSearchParams> }) {
  const params = await searchParams;
  const pageValue = Array.isArray(params.page) ? params.page[0] : params.page;
  const viewValue = Array.isArray(params.view) ? params.view[0] : params.view;
  const searchValue = Array.isArray(params.q) ? params.q[0] : params.q;
  const requestedPage = Number.parseInt(pageValue ?? "1", 10);
  const userPage = await getStaffUserPage({
    page: Number.isFinite(requestedPage) ? requestedPage : 1,
    search: searchValue ?? "",
  });
  const users = userPage.users.map(({ createdAt, permissions, _count, ...user }) => ({
    ...user,
    role: user.role as StaffRole,
    status: user.status as StaffStatus,
    createdAt: createdAt.toISOString(),
    permissions,
    deliveryAssignmentCount: _count.deliveryAssignments,
  }));

  return (
    <StaffManager
      users={users}
      page={userPage.page}
      pageCount={userPage.pageCount}
      total={userPage.total}
      search={userPage.search}
      view={viewValue === "cards" ? "cards" : "list"}
    />
  );
}