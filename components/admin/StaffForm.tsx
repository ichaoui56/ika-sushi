"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createStaffUser } from "../../features/staff/actions";
import type { StaffPermission, StaffRole } from "./staff-types";
import "./EmployeeManagement.css";

const permissionGroups: Array<{ title: string; description: string; permissions: StaffPermission[] }> = [
  { title: "Orders", description: "View and process customer orders.", permissions: ["VIEW_ORDERS", "MANAGE_ORDERS"] },
  { title: "Products", description: "View and manage the product catalog.", permissions: ["VIEW_PRODUCTS", "MANAGE_PRODUCTS"] },
  { title: "Categories", description: "View and organize menu categories.", permissions: ["VIEW_CATEGORIES", "MANAGE_CATEGORIES"] },
  { title: "Customers", description: "Access customer records.", permissions: ["VIEW_CUSTOMERS", "MANAGE_CUSTOMERS"] },
  { title: "Delivery", description: "View or manage deliveries.", permissions: ["VIEW_DELIVERY", "MANAGE_DELIVERY"] },
  { title: "Reports and settings", description: "Access reports, homepage, and settings.", permissions: ["VIEW_REPORTS", "MANAGE_HERO", "MANAGE_SETTINGS"] },
  { title: "Team access", description: "Manage employee accounts.", permissions: ["MANAGE_EMPLOYEES"] },
];

const permissionLabels: Record<StaffPermission, string> = {
  VIEW_ORDERS: "View orders",
  MANAGE_ORDERS: "Manage orders",
  VIEW_PRODUCTS: "View products",
  MANAGE_PRODUCTS: "Manage products",
  VIEW_CUSTOMERS: "View customers",
  MANAGE_CUSTOMERS: "Manage customers",
  VIEW_DELIVERY: "View deliveries",
  MANAGE_DELIVERY: "Manage deliveries",
  VIEW_CATEGORIES: "View categories",
  MANAGE_CATEGORIES: "Manage categories",
  VIEW_REPORTS: "View reports",
  MANAGE_HERO: "Manage homepage slides",
  MANAGE_SETTINGS: "Manage settings",
  MANAGE_EMPLOYEES: "Manage team accounts",
};

export default function StaffForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<StaffRole>("EMPLOYEE");
  const [permissions, setPermissions] = useState<StaffPermission[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const togglePermission = (permission: StaffPermission, checked: boolean) => {
    setPermissions((current) => checked
      ? [...current, permission]
      : current.filter((value) => value !== permission));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await createStaffUser({
        name,
        phone,
        email,
        password,
        role,
        permissions: role === "EMPLOYEE" ? permissions : [],
      });
      if (!result.success) {
        setError(result.message);
        return;
      }
      router.push("/admin/employees");
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to create the account.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="Ika-staff-new-page">
      <header className="Ika-staff-new-heading">
        <div><span>PEOPLE & ACCESS</span><h1>Add team member</h1><p>Create a secure account and choose the right level of access.</p></div>
        <Link href="/admin/employees"><i className="fas fa-arrow-left" aria-hidden="true" />Back to team</Link>
      </header>

      <form className="Ika-staff-form" onSubmit={submit}>
        <section className="Ika-staff-form-section">
          <div className="Ika-staff-section-heading"><span>01 / ACCOUNT</span><div><h2>Personal details</h2><p>Enter the contact details the team member will use to sign in.</p></div></div>
          <div className="Ika-staff-form-fields">
            <label className="is-wide">Full name<input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={120} placeholder="e.g. Samira El Amrani" /></label>
            <label>Phone number<input type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required minLength={8} maxLength={24} placeholder="+212 6 00 00 00 00" /></label>
            <label>Email<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={254} placeholder="name@example.com" /></label>
            <label className="is-wide">Temporary password<div className="Ika-staff-password-field"><input type={showPassword ? "text" : "password"} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} maxLength={128} placeholder="At least 8 characters" /><button type="button" className="Ika-staff-password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((current) => !current)}><i className={`far ${showPassword ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" /></button></div><small className="Ika-staff-field-hint">The password is securely hashed before it is stored.</small></label>
          </div>
        </section>

        <section className="Ika-staff-form-section">
          <div className="Ika-staff-section-heading"><span>02 / ROLE</span><div><h2>Choose an account type</h2><p>Delivery accounts do not receive employee permissions.</p></div></div>
          <div className="Ika-staff-role-options" role="radiogroup" aria-label="Account type">
            <label className={`Ika-staff-role-option${role === "EMPLOYEE" ? " is-selected" : ""}`}>
              <input type="radio" name="staff-role" value="EMPLOYEE" checked={role === "EMPLOYEE"} onChange={() => setRole("EMPLOYEE")} />
              <span className="Ika-staff-role-icon"><i className="fas fa-user-tie" aria-hidden="true" /></span>
              <span><strong>Employee</strong><small>Choose specific permissions for this account.</small></span>
              <span className="Ika-staff-radio-mark" aria-hidden="true" />
            </label>
            <label className={`Ika-staff-role-option${role === "DELIVERY" ? " is-selected" : ""}`}>
              <input type="radio" name="staff-role" value="DELIVERY" checked={role === "DELIVERY"} onChange={() => { setRole("DELIVERY"); setPermissions([]); }} />
              <span className="Ika-staff-role-icon is-delivery"><i className="fas fa-motorcycle" aria-hidden="true" /></span>
              <span><strong>Delivery</strong><small>Access delivery assignments and delivery tools.</small></span>
              <span className="Ika-staff-radio-mark" aria-hidden="true" />
            </label>
          </div>
        </section>

        {role === "EMPLOYEE" ? (
          <section className="Ika-staff-form-section">
            <div className="Ika-staff-section-heading"><span>03 / ACCESS</span><div><h2>Permissions</h2><p>Select what this employee can view or manage.</p></div><span className="Ika-staff-permission-count">{permissions.length} selected</span></div>
            <div className="Ika-staff-permission-groups">
              {permissionGroups.map((group) => (
                <fieldset className="Ika-staff-permission-group" key={group.title}>
                  <legend>{group.title}</legend>
                  <p>{group.description}</p>
                  <div>{group.permissions.map((permission) => (
                    <label className={`Ika-staff-permission-option${permissions.includes(permission) ? " is-checked" : ""}`} key={permission}>
                      <input type="checkbox" checked={permissions.includes(permission)} onChange={(event) => togglePermission(permission, event.target.checked)} />
                      <span className="Ika-staff-checkbox" aria-hidden="true"><i className="fas fa-check" /></span>
                      {permissionLabels[permission]}
                    </label>
                  ))}</div>
                </fieldset>
              ))}
            </div>
          </section>
        ) : (
          <section className="Ika-staff-delivery-note"><span><i className="fas fa-route" aria-hidden="true" /></span><div><strong>Delivery access is ready</strong><p>This account will receive delivery assignment access. Employee permissions are not required.</p></div></section>
        )}

        {error && <p className="Ika-staff-form-error" role="alert">{error}</p>}
        <footer className="Ika-staff-form-footer">
          <button type="submit" disabled={pending}><i className={`fas ${pending ? "fa-spinner fa-spin" : "fa-user-plus"}`} aria-hidden="true" />{pending ? "Creating account…" : "Create account"}</button>
          <Link href="/admin/employees">Cancel</Link>
        </footer>
      </form>
    </div>
  );
}
