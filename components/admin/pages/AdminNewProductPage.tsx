import Link from "next/link";
import { AdminPageHeading } from "../AdminShell";
import ProductEditor from "../ProductEditor";
import { getProductCategoryOptions } from "../../../features/categories/queries";
import { requirePermission } from "../../../lib/auth/permissions";

export default async function AdminNewProductPage() {
  await requirePermission("MANAGE_PRODUCTS");
  const categories = await getProductCategoryOptions();
  return (
    <div className="Ika-product-new-page">
      <header className="Ika-product-new-head">
        <AdminPageHeading title="New product" description="Add a product to your catalog and storefront." />
        <Link href="/admin/products"><i className="fas fa-arrow-left" aria-hidden="true" />Back to products</Link>
      </header>
      <ProductEditor categories={categories.map(({ id, name }) => ({ id, name }))} />
    </div>
  );
}