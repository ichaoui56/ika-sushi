"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItem = {
  label: string;
  href: string;
  icon: string;
  section: string;
};

export function AdminNavigation({ items, id }: { items: NavigationItem[]; id?: string }) {
  const pathname = usePathname();
  const sections = [...new Set(items.map((item) => item.section))];

  return (
    <nav className="Ika-admin-nav" id={id} aria-label="Administration">
      {sections.map((section) => (
        <div className="Ika-admin-nav-group" key={section}>
          <span className="Ika-admin-nav-label">{section}</span>
          {items.filter((item) => item.section === section).map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(`${item.href}/`));
            return (
              <Link key={item.href} href={item.href} className={isActive ? "is-active" : undefined} aria-current={isActive ? "page" : undefined} title={item.label}>
                <i className={`fas ${item.icon}`} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}