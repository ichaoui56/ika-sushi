import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const adminPages = [
  "AdminProductsPage.tsx",
  "AdminCategoriesPage.tsx",
  "AdminLocationsPage.tsx",
  "AdminEmployeesPage.tsx",
];

test("products, categories, delivery zones, and users default to cards", () => {
  for (const filename of adminPages) {
    const source = readFileSync(path.join(process.cwd(), "components/admin/pages", filename), "utf8");
    assert.match(source, /view=\{viewValue === "list" \? "list" : "cards"\}/, filename);
  }
});
