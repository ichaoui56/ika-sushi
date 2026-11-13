import LocationManager from "../LocationManager";
import { getAdminLocationPage } from "../../../features/locations/queries";
import { normalizeLocationTranslations } from "../../../features/locations/translations";
import { getCurrentUser } from "../../../lib/auth/session";

interface LocationSearchParams {
  page?: string | string[];
  view?: string | string[];
  q?: string | string[];
}

export default async function AdminLocationsPage({ searchParams }: { searchParams: Promise<LocationSearchParams> }) {
  const params = await searchParams;
  const pageValue = Array.isArray(params.page) ? params.page[0] : params.page;
  const viewValue = Array.isArray(params.view) ? params.view[0] : params.view;
  const searchValue = Array.isArray(params.q) ? params.q[0] : params.q;
  const requestedPage = Number.parseInt(pageValue ?? "1", 10);
  const [locationPage, currentUser] = await Promise.all([
    getAdminLocationPage({
      page: Number.isFinite(requestedPage) ? requestedPage : 1,
      search: searchValue ?? "",
    }),
    getCurrentUser(),
  ]);
  const locations = locationPage.locations.map((location) => ({
    ...location,
    translations: normalizeLocationTranslations(location.translations),
  }));
  const canManage = currentUser?.role === "ADMIN" || Boolean(currentUser?.permissions.includes("MANAGE_DELIVERY"));

  return (
    <LocationManager
      locations={locations}
      page={locationPage.page}
      pageCount={locationPage.pageCount}
      total={locationPage.total}
      search={locationPage.search}
      canManage={canManage}
      view={viewValue === "list" ? "list" : "cards"}
    />
  );
}