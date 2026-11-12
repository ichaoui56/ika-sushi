import { AdminPageHeading } from "../AdminShell";
import ProductManager from "../ProductManager";
import { getProductCategoryOptions } from "../../../features/categories/queries";
import { getAdminProducts } from "../../../features/products/queries";
import { normalizeProductTranslations } from "../../../features/products/translations";
import { getCurrentUser } from "../../../lib/auth/session";

interface ProductSearchParams {
  page?: string | string[];
  view?: string | string[];
  q?: string | string[];
  categoryId?: string | string[];
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
  const categoryValue = Array.isArray(params.categoryId) ? params.categoryId[0] : params.categoryId;
  const requestedPage = Number.parseInt(pageValue ?? "1", 10);
  const [productPage, categories, currentUser] = await Promise.all([
    getAdminProducts({ page: Number.isFinite(requestedPage) ? requestedPage : 1, search: searchValue ?? "", categoryId: categoryValue }),
    getProductCategoryOptions(),
    getCurrentUser(),
  ]);
  const canManage = currentUser?.role === "ADMIN" || Boolean(currentUser?.permissions.includes("MANAGE_PRODUCTS"));
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
      selectedCategoryId={productPage.categoryId}
      canManage={canManage}
      view={viewValue === "list" ? "list" : "cards"}
    />
  );
}