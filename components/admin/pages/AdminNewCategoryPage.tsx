import { notFound } from "next/navigation";
import CategoryEditor from "../CategoryEditor";
import { getAdminCategory } from "../../../features/categories/queries";
import { requirePermission } from "../../../lib/auth/permissions";

export default async function AdminNewCategoryPage({ searchParams }: { searchParams?: Promise<{ edit?: string }> }) {
  await requirePermission("MANAGE_CATEGORIES");
  const params = await searchParams;
  const category = params?.edit ? await getAdminCategory(params.edit) : null;
  if (params?.edit && !category) notFound();

  return <CategoryEditor category={category ?? undefined} />;
}
