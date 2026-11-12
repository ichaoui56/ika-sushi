"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { updateStaffUser } from "../../features/staff/actions";
import type { AdminStaffRecord, StaffPermission, StaffRole } from "./staff-types";
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

function StaffActions({ user, pending, onToggle }: { user: AdminStaffRecord; pending: boolean; onToggle: () => void }) {
  const isActive = user.status === "ACTIVE";
  return (
    <button className={`Ika-staff-toggle${isActive ? " is-active" : ""}`} type="button" disabled={pending} onClick={onToggle}>
      <i className={`fas ${isActive ? "fa-user-slash" : "fa-user-check"}`} aria-hidden="true" />
      {pending ? "Updating…" : isActive ? "Disable access" : "Enable access"}
    </button>
  );
}

export default function StaffManager({
  users,
  page,
  pageCount,
  total,
  search,
  view,
}: {
  users: AdminStaffRecord[];
  page: number;
  pageCount: number;
  total: number;
  search: string;
  view: StaffView;
}) {
  const router = useRouter();
  const [isSearching, startSearch] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");

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

  const permissionNames = (permissions: Array<{ permission: StaffPermission }>) => permissions.map(({ permission }) => permission.replace(/^(VIEW|MANAGE)_/, "").replaceAll("_", " "));

  return (
    <section className="Ika-staff-manager">
      <header className="Ika-staff-page-heading">
        <div><span>PEOPLE & ACCESS</span><h1>Employees and delivery</h1><p>Manage staff accounts, permissions, and access status.</p></div>
        <Link href="/admin/employees/new" className="Ika-staff-add-button"><i className="fas fa-user-plus" aria-hidden="true" />Add team member</Link>
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
        <div className="Ika-staff-empty"><span><i className="fas fa-users" aria-hidden="true" /></span><h2>{search ? "No matching accounts" : "Your team is empty"}</h2><p>{search ? "Try a different name, phone number, or email." : "Add an employee or delivery account to get started."}</p>{!search && <Link href="/admin/employees/new" className="Ika-staff-add-button"><i className="fas fa-user-plus" aria-hidden="true" />Add team member</Link>}</div>
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
                <td><StaffActions user={user} pending={pendingId === user.id} onToggle={() => void toggleAccess(user)} /></td>
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
              <footer className="Ika-staff-card-footer"><small>Added {new Date(user.createdAt).toLocaleDateString()}</small><StaffActions user={user} pending={pendingId === user.id} onToggle={() => void toggleAccess(user)} /></footer>
            </article>;
          })}
        </div>
      )}

      {pageCount > 1 && <Pagination page={page} pageCount={pageCount} view={view} search={search} />}
    </section>
  );
}
