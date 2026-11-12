import { notFound } from "next/navigation";
import LocationEditor from "../LocationEditor";
import { getAdminLocation } from "../../../features/locations/queries";

export default async function AdminNewLocationPage({ searchParams }: { searchParams?: Promise<{ edit?: string }> }) {
  const params = await searchParams;
  const location = params?.edit ? await getAdminLocation(params.edit) : null;
  if (params?.edit && !location) notFound();

  return <LocationEditor location={location ?? undefined} />;
}
