import CategoryManager from "../CategoryManager";
import { getAdminCategoryPage } from "../../../features/categories/queries";

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
  const categoryPage = await getAdminCategoryPage({
    page: Number.isFinite(requestedPage) ? requestedPage : 1,
    search: searchValue ?? "",
  });

  return (
    <CategoryManager
      categories={categoryPage.categories}
      page={categoryPage.page}
      pageCount={categoryPage.pageCount}
      total={categoryPage.total}
      search={categoryPage.search}
      view={viewValue === "cards" ? "cards" : "list"}
    />
  );
}