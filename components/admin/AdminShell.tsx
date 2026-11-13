import Link from "next/link";
import type { ReactNode } from "react";
import { requireRole } from "../../lib/auth/permissions";
import type { Permission } from "@prisma/client";
import { AdminShellLayout } from "./AdminShellLayout";
import "./AdminShell.css";

const navigation: Array<{ label: string; href: string; icon: string; section: string; permission?: Permission; permissions?: Permission[] }> = [
  { label: "Vue d'ensemble", href: "/admin/dashboard", icon: "fa-home", section: "Espace de travail", permission: "VIEW_REPORTS" },
  { label: "Commandes", href: "/admin/orders", icon: "fa-shopping-cart", section: "Boutique", permissions: ["VIEW_ORDERS", "MANAGE_ORDERS"] },
  { label: "Produits", href: "/admin/products", icon: "fa-box", section: "Boutique", permissions: ["VIEW_PRODUCTS", "MANAGE_PRODUCTS"] },
  { label: "Catégories", href: "/admin/categories", icon: "fa-th-large", section: "Boutique", permissions: ["VIEW_CATEGORIES", "MANAGE_CATEGORIES"] },
  { label: "Slides d'accueil", href: "/admin/hero", icon: "fa-bolt", section: "Boutique", permission: "MANAGE_HERO" },
  { label: "Zones de livraison", href: "/admin/locations", icon: "fa-map-marker-alt", section: "Boutique", permissions: ["VIEW_DELIVERY", "MANAGE_DELIVERY"] },
  { label: "Livraisons", href: "/admin/delivery", icon: "fa-truck", section: "Opérations", permissions: ["VIEW_DELIVERY", "MANAGE_DELIVERY"] },
  { label: "Équipe", href: "/admin/employees", icon: "fa-users", section: "Opérations", permissions: ["VIEW_EMPLOYEES", "MANAGE_EMPLOYEES"] },
  { label: "Paramètres", href: "/admin/settings", icon: "fa-cog", section: "Configuration", permission: "MANAGE_SETTINGS" },
];

export async function AdminShell({ children }: { children: ReactNode }) {
  const user = await requireRole("ADMIN", "EMPLOYEE");
  const visibleNavigation = navigation.filter(
    (item) => user.role === "ADMIN" || (item.permissions
      ? item.permissions.some((permission) => user.permissions.includes(permission))
      : item.permission && user.permissions.includes(item.permission)),
  );

  return <AdminShellLayout name={user.name} role={user.role} items={visibleNavigation}>{children}</AdminShellLayout>;
}

export function AdminPageHeading({ title, description }: { title: string; description: string }) {
  return <header className="Ika-admin-heading"><div><span>IKA SUSHI / MANAGEMENT</span><h1>{title}</h1><p>{description}</p></div></header>;
}

export function AdminTable({ headers, rows, emptyMessage = "No records yet." }: {
  headers: string[];
  rows: Array<Array<string | number>>;
  emptyMessage?: string;
}) {
  if (!rows.length) return <p className="Ika-admin-empty">{emptyMessage}</p>;
  return (
    <div className="Ika-admin-table-scroll">
      <table className="Ika-admin-table">
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}