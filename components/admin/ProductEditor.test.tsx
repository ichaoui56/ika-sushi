import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

test("Product editor supports cover image selection and elevated drawer layering", () => {
  const editorSource = readFileSync(path.join(process.cwd(), "components/admin/ProductEditor.tsx"), "utf8");
  const productCssSource = readFileSync(path.join(process.cwd(), "components/admin/ProductManagement.css"), "utf8");
  const shellCssSource = readFileSync(path.join(process.cwd(), "components/admin/AdminShell.css"), "utf8");

  assert.match(editorSource, /Set as cover/i);
  assert.match(editorSource, /isPrimary/i);
  assert.match(editorSource, /Ika-product-category-select-control/);
  assert.doesNotMatch(editorSource, /Ika-product-category-grid/);
  assert.match(productCssSource, /Ika-product-drawer-layer\s*\{[^}]*z-index:\s*1400/i);
  assert.match(productCssSource, /Ika-product-drawer-header\s*>\s*button\s*\{[^}]*padding:\s*0/i);
  assert.match(shellCssSource, /Ika-admin-sidebar\s*\{[^}]*z-index:\s*10/i);
});

test("Product dashboard search uses client-side navigation", () => {
  const source = readFileSync(path.join(process.cwd(), "components/admin/ProductManager.tsx"), "utf8");

  assert.match(source, /event\.preventDefault\(\)/);
  assert.match(source, /router\.replace\(productsHref\(1, view, query, selectedCategoryId\)\)/);
  assert.match(source, /aria-label="Filter by category"/);
  assert.match(source, /if \(categoryId\) params\.set\("categoryId", categoryId\)/);
});
