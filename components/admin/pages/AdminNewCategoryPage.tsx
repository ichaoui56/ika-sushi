import { notFound } from "next/navigation";
import CategoryEditor from "../CategoryEditor";
import { getAdminCategory } from "../../../features/categories/queries";
import { normalizeCategoryTranslations } from "../../../features/categories/translations";
import { requirePermission } from "../../../lib/auth/permissions";

export default async function AdminNewCategoryPage({ searchParams }: { searchParams?: Promise<{ edit?: string }> }) {
  await requirePermission("MANAGE_CATEGORIES");
  const params = await searchParams;
  const category = params?.edit ? await getAdminCategory(params.edit) : null;
  if (params?.edit && !category) notFound();
  const editorCategory = category
    ? { ...category, translations: normalizeCategoryTranslations(category.translations) }
    : undefined;

  return <CategoryEditor category={editorCategory} />;
}
