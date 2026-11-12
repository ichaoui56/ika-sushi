import LocationManager from "../LocationManager";
import { getAdminLocationPage } from "../../../features/locations/queries";

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
  const locationPage = await getAdminLocationPage({
    page: Number.isFinite(requestedPage) ? requestedPage : 1,
    search: searchValue ?? "",
  });

  return (
    <LocationManager
      locations={locationPage.locations}
      page={locationPage.page}
      pageCount={locationPage.pageCount}
      total={locationPage.total}
      search={locationPage.search}
      view={viewValue === "cards" ? "cards" : "list"}
    />
  );
}