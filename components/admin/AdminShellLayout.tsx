"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { logoutAction } from "../../features/auth/actions";
import type { UserRole } from "@prisma/client";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { AdminNavigation } from "./AdminNavigation";

type NavigationItem = {
  label: string;
  href: string;
  icon: string;
  section: string;
};

const SIDEBAR_STORAGE_KEY = "Ika-admin-sidebar";

export function AdminShellLayout({
  children,
  name,
  role,
  items,
}: {
  children: ReactNode;
  name: string;
  role: UserRole;
  items: NavigationItem[];
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setIsCollapsed(window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "collapsed");
  }, []);

  function toggleSidebar() {
    setIsCollapsed((collapsed) => {
      const nextCollapsed = !collapsed;
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, nextCollapsed ? "collapsed" : "expanded");
      return nextCollapsed;
    });
  }

  const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

  return (
    <div className={`Ika-admin-shell${isCollapsed ? " is-sidebar-collapsed" : ""}`}>
      <aside className="Ika-admin-sidebar">
        <div className="Ika-admin-brand-row">
          <Link className="Ika-admin-brand" href="/" aria-label="IKA Sushi, boutique">
            <img className="is-full-logo" src="/white-logo.png" alt="IKA Sushi" />
            <img className="is-compact-logo" src="/adventure-bay.webp" alt="IKA Sushi" />
          </Link>
          <button
            className="Ika-admin-sidebar-toggle"
            type="button"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Ouvrir le menu" : "Réduire le menu"}
            aria-expanded={!isCollapsed}
            aria-controls="Ika-admin-navigation"
            title={isCollapsed ? "Ouvrir le menu" : "Réduire le menu"}
          >
            <i className="fas fa-angle-left" aria-hidden="true" />
          </button>
        </div>
        <AdminNavigation items={items} id="Ika-admin-navigation" />
        <div className="Ika-admin-account">
          <span className="Ika-admin-avatar">{initials}</span>
          <span className="Ika-admin-account-copy"><strong>{name}</strong><small>{role === "ADMIN" ? "Administrateur" : "Équipe"}</small></span>
          <form action={logoutAction}>
            <button type="submit" aria-label="Se déconnecter" title="Se déconnecter"><i className="fas fa-sign-out-alt" aria-hidden="true" /></button>
          </form>
        </div>
      </aside>
      <div className="Ika-admin-workspace">
        <header className="Ika-admin-topbar">
          <AdminBreadcrumb />
          <div className="Ika-admin-top-actions">
            <Link href="/" className="Ika-admin-top-button is-primary"><span>Boutique en ligne</span><i className="fas fa-external-link-alt" aria-hidden="true" /></Link>
            <Link href="/" className="Ika-admin-top-button"><span>Voir la boutique</span><i className="fas fa-external-link-alt" aria-hidden="true" /></Link>
            <span className="Ika-admin-avatar is-top" aria-label={name}>{initials}</span>
          </div>
        </header>
        <main className="Ika-admin-main">{children}</main>
      </div>
    </div>
  );
}