import { AdminPageHeading } from "../AdminShell";
import ProductManager from "../ProductManager";
import { getAdminCategories } from "../../../features/categories/queries";
import { getAdminProducts } from "../../../features/products/queries";
import { normalizeProductTranslations } from "../../../features/products/translations";

interface ProductSearchParams {
  page?: string | string[];
  view?: string | string[];
  q?: string | string[];
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<ProductSearchParams>;
}) {
  const params = await searchParams;
  const pageValue = Array.isArray(params.page) ? params.page[0] : params.page;
  const viewValue = Array.isArray(params.view) ? params.view[0] : params.view;
  const searchValue = Array.isArray(params.q) ? params.q[0] : params.q;
  const requestedPage = Number.parseInt(pageValue ?? "1", 10);
  const [productPage, categories] = await Promise.all([
    getAdminProducts({ page: Number.isFinite(requestedPage) ? requestedPage : 1, search: searchValue ?? "" }),
    getAdminCategories(),
  ]);
  const products = productPage.products.map((product) => ({
    ...product,
    discountPercent: product.discountPercent?.toString() ?? null,
    translations: normalizeProductTranslations(product.translations),
    createdAt: product.createdAt.toISOString(),
  }));

  return (
    <ProductManager
      products={products}
      categories={categories.map(({ id, name }) => ({ id, name }))}
      page={productPage.page}
      pageCount={productPage.pageCount}
      total={productPage.total}
      search={productPage.search}
      view={viewValue === "cards" ? "cards" : "list"}
    />
  );
}