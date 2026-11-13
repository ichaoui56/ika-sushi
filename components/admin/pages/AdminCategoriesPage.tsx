import CategoryManager from "../CategoryManager";
import { getAdminCategoryPage } from "../../../features/categories/queries";
import { normalizeCategoryTranslations } from "../../../features/categories/translations";
import { getCurrentUser } from "../../../lib/auth/session";

interface CategorySearchParams {
  page?: string | string[];
  view?: string | string[];
  q?: string | string[];
}

export default async function AdminCategoriesPage({ searchParams }: { searchParams: Promise<CategorySearchParams> }) {
  const params = await searchParams;
  const pageValue = Array.isArray(params.page) ? params.page[0] : params.page;
  const viewValue = Array.isArray(params.view) ? params.view[0] : params.view;
  const searchValue = Array.isArray(params.q) ? params.q[0] : params.q;
  const requestedPage = Number.parseInt(pageValue ?? "1", 10);
  const [categoryPage, currentUser] = await Promise.all([
    getAdminCategoryPage({
      page: Number.isFinite(requestedPage) ? requestedPage : 1,
      search: searchValue ?? "",
    }),
    getCurrentUser(),
  ]);
  const categories = categoryPage.categories.map((category) => ({
    ...category,
    translations: normalizeCategoryTranslations(category.translations),
  }));
  const canManage = currentUser?.role === "ADMIN" || Boolean(currentUser?.permissions.includes("MANAGE_CATEGORIES"));

  return (
    <CategoryManager
      categories={categories}
      page={categoryPage.page}
      pageCount={categoryPage.pageCount}
      total={categoryPage.total}
      search={categoryPage.search}
      canManage={canManage}
      view={viewValue === "list" ? "list" : "cards"}
    />
  );
}