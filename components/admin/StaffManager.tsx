"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteStaffUser, getStaffUserDetails, updateStaffUser } from "../../features/staff/actions";
import type { AdminStaffDetails, AdminStaffRecord, StaffPermission, StaffRole } from "./staff-types";
import "./EmployeeManagement.css";

type StaffView = "list" | "cards";

const roleLabels: Record<StaffRole, string> = { EMPLOYEE: "Employee", DELIVERY: "Delivery" };

function employeesHref(page: number, view: StaffView, search: string) {
  const params = new URLSearchParams({ page: String(page), view });
  if (search) params.set("q", search);
  return `/admin/employees?${params.toString()}`;
}

function Pagination({ page, pageCount, view, search }: { page: number; pageCount: number; view: StaffView; search: string }) {
  const firstPage = Math.max(1, Math.min(page - 2, pageCount - 4));
  const pages = Array.from({ length: Math.min(5, pageCount) }, (_, index) => firstPage + index);
  return (
    <nav className="Ika-staff-pagination" aria-label="Team pages">
      <Link aria-label="Previous page" aria-disabled={page <= 1} className={page <= 1 ? "is-disabled" : ""} href={employeesHref(Math.max(1, page - 1), view, search)}><i className="fas fa-chevron-left" aria-hidden="true" /></Link>
      {pages.map((number) => <Link key={number} href={employeesHref(number, view, search)} aria-current={page === number ? "page" : undefined} className={page === number ? "is-current" : ""}>{number}</Link>)}
      <Link aria-label="Next page" aria-disabled={page >= pageCount} className={page >= pageCount ? "is-disabled" : ""} href={employeesHref(Math.min(pageCount, page + 1), view, search)}><i className="fas fa-chevron-right" aria-hidden="true" /></Link>
    </nav>
  );
}

function StaffActions({ user, pending, canManage, onDetails, onToggle, onDelete }: { user: AdminStaffRecord; pending: boolean; canManage: boolean; onDetails: () => void; onToggle: () => void; onDelete: () => void }) {
  const isActive = user.status === "ACTIVE";
  return (
    <div className="Ika-staff-actions">
      <button className="Ika-staff-details-button" type="button" title="View details" aria-label={`View details for ${user.name}`} disabled={pending} onClick={onDetails}>
        <i className="far fa-eye" aria-hidden="true" />
      </button>
      {canManage && <>
        <Link href={`/admin/employees/new?edit=${encodeURIComponent(user.id)}`} className="Ika-staff-edit" aria-label={`Edit ${user.name}`} title="Edit user">
          <i className="fas fa-pen" aria-hidden="true" />
        </Link>
        <button className={`Ika-staff-toggle${isActive ? " is-active" : ""}`} type="button" disabled={pending} onClick={onToggle}>
          <i className={`fas ${isActive ? "fa-user-slash" : "fa-user-check"}`} aria-hidden="true" />
          {pending ? "Updating…" : isActive ? "Disable" : "Enable"}
        </button>
        <button className="Ika-staff-delete" type="button" disabled={pending} onClick={onDelete} aria-label={`Permanently delete ${user.name}`} title="Permanently delete">
          <i className="far fa-trash-alt" aria-hidden="true" />
        </button>
      </>}
    </div>
  );
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function StaffDetailsDrawer({ details, loading, error, onClose }: {
  details: AdminStaffDetails | null;
  loading: boolean;
  error: string;
  onClose: () => void;
}) {
  const permissions = details?.user.permissions.map(({ permission }) => permission.replace(/^(VIEW|MANAGE)_/, "").replaceAll("_", " ")) ?? [];
  return (
    <div className="Ika-staff-details-layer">
      <button className="Ika-staff-details-scrim" type="button" aria-label="Close team member details" onClick={onClose} />
      <aside className="Ika-staff-details-drawer" role="dialog" aria-modal="true" aria-labelledby="Ika-staff-details-title">
        <header className="Ika-staff-details-header">
          <div><span>TEAM ACCOUNT</span><h2 id="Ika-staff-details-title">{details?.user.name ?? "Team member details"}</h2></div>
          <button type="button" aria-label="Close team member details" onClick={onClose}><i className="fas fa-times" aria-hidden="true" /></button>
        </header>
        {loading ? (
          <div className="Ika-staff-details-loading"><i className="fas fa-spinner fa-spin" aria-hidden="true" />Loading account activity…</div>
        ) : error ? (
          <p className="Ika-staff-details-error" role="alert">{error}</p>
        ) : details ? (
          <div className="Ika-staff-details-content">
            <section className="Ika-staff-details-profile">
              <span className={`Ika-staff-avatar is-${details.user.role.toLowerCase()}`}>{details.user.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()}</span>
              <div><strong>{details.user.name}</strong><span>{roleLabels[details.user.role]} · {details.user.status === "ACTIVE" ? "Active" : "Disabled"}</span></div>
            </section>
            <dl className="Ika-staff-details-contact">
              <div><dt>Phone</dt><dd>{details.user.phone}</dd></div>
              <div><dt>Email</dt><dd>{details.user.email || "—"}</dd></div>
              <div><dt>Account created</dt><dd>{new Date(details.user.createdAt).toLocaleString()}</dd></div>
            </dl>

            {details.deliveryStatistics ? (
              <>
                <section className="Ika-staff-details-section">
                  <div className="Ika-staff-details-section-heading"><span>DELIVERY PERFORMANCE</span><strong>Lifetime statistics</strong></div>
                  <div className="Ika-staff-stats-grid">
                    <div><strong>{details.deliveryStatistics.lifetimeAssignments}</strong><span>Assignments received</span></div>
                    <div><strong>{details.deliveryStatistics.currentAssignments}</strong><span>Currently assigned</span></div>
                    <div><strong>{details.deliveryStatistics.deliveredByUser}</strong><span>Marked delivered</span></div>
                    <div><strong>{details.deliveryStatistics.failedByUser}</strong><span>Delivery failed reports</span></div>
                  </div>
                  <p className="Ika-staff-details-note">{details.deliveryStatistics.statusUpdatesByUser} order status updates recorded under this account.</p>
                  <div className="Ika-staff-status-breakdown">
                    {details.deliveryStatistics.currentByStatus.map(({ status, count }) => <span key={status}>{formatStatus(status)} <strong>{count}</strong></span>)}
                  </div>
                </section>
                <section className="Ika-staff-details-section">
                  <div className="Ika-staff-details-section-heading"><span>ACTIVE WORK</span><strong>Current assignments</strong></div>
                  {details.currentDeliveries?.length ? (
                    <div className="Ika-staff-current-deliveries">
                      {details.currentDeliveries.map((order) => (
                        <article key={order.id}>
                          <div><strong>{order.reference}</strong><span>{formatStatus(order.status)}</span></div>
                          <p>{order.customerName} · {order.customerPhone}</p>
                          <small>{order.locationName} · {new Date(order.assignedAt).toLocaleString()}</small>
                        </article>
                      ))}
                    </div>
                  ) : <p className="Ika-staff-details-empty">No current delivery assignments.</p>}
                </section>
              </>
            ) : (
              <section className="Ika-staff-details-section">
                <div className="Ika-staff-details-section-heading"><span>ACCESS</span><strong>Permissions</strong></div>
                {permissions.length ? <div className="Ika-staff-permission-list">{permissions.map((permission) => <span key={permission}>{permission}</span>)}</div> : <p className="Ika-staff-details-empty">No employee permissions assigned.</p>}
              </section>
            )}

            <section className="Ika-staff-details-section">
              <div className="Ika-staff-details-section-heading"><span>ACCOUNT HISTORY</span><strong>Recent activity</strong></div>
              {details.activity.length ? (
                <ol className="Ika-staff-activity-list">
                  {details.activity.map((activity) => (
                    <li key={`${activity.kind}-${activity.id}`}>
                      <span className={`Ika-staff-activity-marker is-${activity.kind}`} />
                      <div>
                        <strong>{activity.kind === "status" ? `${activity.previousStatus ? formatStatus(activity.previousStatus) : "Order created"} → ${formatStatus(activity.nextStatus ?? "")}` : activity.nextPerson ? `Assigned to ${activity.nextPerson}` : activity.previousPerson ? `Reassigned from ${activity.previousPerson}` : "Delivery assignment updated"}</strong>
                        <p>{activity.reference} · {activity.customerName} · {activity.locationName}</p>
                        {activity.note && <small>Note: {activity.note}</small>}
                        {activity.changedBy && <small>Changed by {activity.changedBy}</small>}
                        <time dateTime={activity.createdAt}>{new Date(activity.createdAt).toLocaleString()}</time>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : <p className="Ika-staff-details-empty">No recorded account activity.</p>}
            </section>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

export default function StaffManager({
  users,
  page,
  pageCount,
  total,
  search,
  view,
  canManage,
}: {
  users: AdminStaffRecord[];
  page: number;
  pageCount: number;
  total: number;
  search: string;
  view: StaffView;
  canManage: boolean;
}) {
  const router = useRouter();
  const [isSearching, startSearch] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [details, setDetails] = useState<AdminStaffDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const showDetails = async (user: AdminStaffRecord) => {
    setDetails(null);
    setDetailsError("");
    setDetailsLoading(true);
    try {
      const result = await getStaffUserDetails(user.id);
      if (!result) setDetailsError("This account could not be found.");
      else setDetails(result as AdminStaffDetails);
    } catch (detailsLoadError) {
      setDetailsError(detailsLoadError instanceof Error ? detailsLoadError.message : "Unable to load account details.");
    } finally {
      setDetailsLoading(false);
    }
  };

  const toggleAccess = async (user: AdminStaffRecord) => {
    setPendingId(user.id);
    setError("");
    try {
      const result = await updateStaffUser({
        userId: user.id,
        isActive: user.status !== "ACTIVE",
        permissions: user.role === "EMPLOYEE" ? user.permissions.map(({ permission }) => permission) : [],
      });
      if (!result.success) setError(result.message);
      else router.refresh();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to update staff access.");
    } finally {
      setPendingId(null);
    }
  };

  const permanentlyDelete = async (user: AdminStaffRecord) => {
    if (!window.confirm(`Permanently delete ${user.name}'s account? This cannot be undone.`)) return;
    setPendingId(user.id);
    setError("");
    try {
      const result = await deleteStaffUser(user.id);
      if (!result.success) setError(result.message);
      else router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete the staff account.");
    } finally {
      setPendingId(null);
    }
  };

  const permissionNames = (permissions: Array<{ permission: StaffPermission }>) => permissions.map(({ permission }) => permission.replace(/^(VIEW|MANAGE)_/, "").replaceAll("_", " "));

  return (
    <section className="Ika-staff-manager">
      <header className="Ika-staff-page-heading">
        <div><span>PEOPLE & ACCESS</span><h1>Employees and delivery</h1><p>{canManage ? "View and manage staff accounts, permissions, and access status." : "View staff and delivery accounts."}</p></div>
        {canManage && <Link href="/admin/employees/new" className="Ika-staff-add-button"><i className="fas fa-user-plus" aria-hidden="true" />Add team member</Link>}
      </header>

      <div className="Ika-staff-toolbar">
        <form className="Ika-staff-search" role="search" onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const query = String(formData.get("q") ?? "").trim();
          startSearch(() => router.replace(employeesHref(1, view, query)));
        }}>
          <i className="fas fa-search" aria-hidden="true" />
          <input type="search" name="q" defaultValue={search} placeholder="Search name, phone, or email" aria-label="Search team members" />
          <button type="submit" disabled={isSearching}>{isSearching ? "Searching…" : "Search"}</button>
        </form>
        <div className="Ika-staff-toolbar-meta">
          <span>{total} {total === 1 ? "account" : "accounts"}</span>
          <div className="Ika-staff-view-toggle" role="group" aria-label="Team layout">
            <Link href={employeesHref(page, "list", search)} aria-label="List view" aria-current={view === "list" ? "page" : undefined} className={view === "list" ? "is-active" : ""}><i className="fas fa-list" aria-hidden="true" /></Link>
            <Link href={employeesHref(page, "cards", search)} aria-label="Card view" aria-current={view === "cards" ? "page" : undefined} className={view === "cards" ? "is-active" : ""}><i className="fas fa-th-large" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>

      {error && <p className="Ika-staff-error" role="alert">{error}</p>}
      {users.length === 0 ? (
        <div className="Ika-staff-empty"><span><i className="fas fa-users" aria-hidden="true" /></span><h2>{search ? "No matching accounts" : "Your team is empty"}</h2><p>{search ? "Try a different name, phone number, or email." : canManage ? "Add an employee or delivery account to get started." : "There are no team accounts to show."}</p>{!search && canManage && <Link href="/admin/employees/new" className="Ika-staff-add-button"><i className="fas fa-user-plus" aria-hidden="true" />Add team member</Link>}</div>
      ) : view === "list" ? (
        <div className="Ika-staff-list-scroll">
          <table className="Ika-staff-list">
            <thead><tr><th>Team member</th><th>Role</th><th>Access</th><th>Permissions / activity</th><th>Added</th><th aria-label="Actions" /></tr></thead>
            <tbody>{users.map((user) => {
              const permissions = permissionNames(user.permissions);
              return <tr key={user.id}>
                <td><div className="Ika-staff-identity"><span className={`Ika-staff-avatar is-${user.role.toLowerCase()}`}>{user.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()}</span><span><strong>{user.name}</strong><small>{user.email || user.phone}</small></span></div></td>
                <td><span className={`Ika-staff-role is-${user.role.toLowerCase()}`}>{roleLabels[user.role]}</span></td>
                <td><span className={`Ika-staff-status${user.status === "ACTIVE" ? " is-active" : ""}`}>{user.status === "ACTIVE" ? "Active" : "Disabled"}</span></td>
                <td>{user.role === "EMPLOYEE" ? `${permissions.length} permissions` : `${user.deliveryAssignmentCount} assigned deliveries`}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td><StaffActions user={user} pending={pendingId === user.id} canManage={canManage} onDetails={() => void showDetails(user)} onToggle={() => void toggleAccess(user)} onDelete={() => void permanentlyDelete(user)} /></td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      ) : (
        <div className="Ika-staff-card-grid">
          {users.map((user) => {
            const permissions = permissionNames(user.permissions);
            return <article className="Ika-staff-card" key={user.id}>
              <header className="Ika-staff-card-header">
                <span className={`Ika-staff-avatar is-${user.role.toLowerCase()}`}>{user.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()}</span>
                <span className={`Ika-staff-status${user.status === "ACTIVE" ? " is-active" : ""}`}>{user.status === "ACTIVE" ? "Active" : "Disabled"}</span>
              </header>
              <div className="Ika-staff-card-identity"><h2>{user.name}</h2><span>{roleLabels[user.role]}</span></div>
              <dl className="Ika-staff-card-details"><div><dt>Phone</dt><dd>{user.phone}</dd></div><div><dt>Email</dt><dd>{user.email || "—"}</dd></div><div><dt>{user.role === "EMPLOYEE" ? "Permissions" : "Assigned deliveries"}</dt><dd>{user.role === "EMPLOYEE" ? permissions.length : user.deliveryAssignmentCount}</dd></div></dl>
              {user.role === "EMPLOYEE" && permissions.length > 0 && <div className="Ika-staff-permission-list">{permissions.slice(0, 4).map((permission) => <span key={permission}>{permission}</span>)}{permissions.length > 4 && <span>+{permissions.length - 4}</span>}</div>}
              <footer className="Ika-staff-card-footer"><small>Added {new Date(user.createdAt).toLocaleDateString()}</small><StaffActions user={user} pending={pendingId === user.id} canManage={canManage} onDetails={() => void showDetails(user)} onToggle={() => void toggleAccess(user)} onDelete={() => void permanentlyDelete(user)} /></footer>
            </article>;
          })}
        </div>
      )}

      {pageCount > 1 && <Pagination page={page} pageCount={pageCount} view={view} search={search} />}
      {detailsLoading || detailsError || details ? <StaffDetailsDrawer details={details} loading={detailsLoading} error={detailsError} onClose={() => { setDetails(null); setDetailsError(""); }} /> : null}
    </section>
  );
}
