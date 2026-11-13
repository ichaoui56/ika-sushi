"use client";

import { usePathname } from "next/navigation";

const labels: Record<string, string> = {
  "/admin/dashboard": "Vue d'ensemble",
  "/admin/orders": "Commandes",
  "/admin/products": "Produits",
  "/admin/categories": "Catégories",
  "/admin/hero": "Slides d'accueil",
  "/admin/locations": "Zones de livraison",
  "/admin/delivery": "Livraisons",
  "/admin/employees": "Équipe",
  "/admin/settings": "Paramètres",
};

export function AdminBreadcrumb() {
  const pathname = usePathname();
  return (
    <div className="Ika-admin-breadcrumb">
      <span>Administration</span>
      <i className="fas fa-chevron-right" aria-hidden="true" />
      <strong>{labels[pathname] ?? "Gestion"}</strong>
    </div>
  );
}