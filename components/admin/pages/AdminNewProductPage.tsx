import Link from "next/link";
import { AdminPageHeading } from "../AdminShell";
import ProductEditor from "../ProductEditor";
import { getAdminCategories } from "../../../features/categories/queries";

export default async function AdminNewProductPage() {
  const categories = await getAdminCategories();
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