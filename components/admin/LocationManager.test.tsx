import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

test("Location manager provides searchable list and card views with pagination", () => {
  const source = readFileSync(path.join(process.cwd(), "components/admin/LocationManager.tsx"), "utf8");
  const pageSource = readFileSync(path.join(process.cwd(), "components/admin/pages/AdminLocationsPage.tsx"), "utf8");

  assert.match(source, /Ika-location-card-grid/);
  assert.match(source, /Ika-location-list/);
  assert.match(source, /Ika-location-pagination/);
  assert.match(source, /router\.replace\(locationsHref\(1, view, query\)\)/);
  assert.match(pageSource, /getAdminLocationPage/);
});

test("Location editor omits parent and delivery controls", () => {
  const source = readFileSync(path.join(process.cwd(), "components/admin/LocationEditor.tsx"), "utf8");

  assert.match(source, /Delivery fee \(MAD\)/);
  assert.match(source, /Active on storefront/);
  assert.doesNotMatch(source, /Parent|Minimum order|Estimated minutes|Accept delivery/);
});
