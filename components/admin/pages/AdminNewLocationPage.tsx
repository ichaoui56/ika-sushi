import { notFound } from "next/navigation";
import LocationEditor from "../LocationEditor";
import { getAdminLocation } from "../../../features/locations/queries";
import { requirePermission } from "../../../lib/auth/permissions";

export default async function AdminNewLocationPage({ searchParams }: { searchParams?: Promise<{ edit?: string }> }) {
  await requirePermission("MANAGE_DELIVERY");
  const params = await searchParams;
  const location = params?.edit ? await getAdminLocation(params.edit) : null;
  if (params?.edit && !location) notFound();

  return <LocationEditor location={location ?? undefined} />;
}
