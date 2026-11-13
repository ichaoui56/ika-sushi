import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { localizeCategoryName, makeCategoryTranslations } from "../../features/categories/translations";

test("Category manager supports list and card views with client-side search", () => {
  const source = readFileSync(path.join(process.cwd(), "components/admin/CategoryManager.tsx"), "utf8");
  const pageSource = readFileSync(path.join(process.cwd(), "components/admin/pages/AdminCategoriesPage.tsx"), "utf8");

  assert.match(source, /Ika-category-card-grid/);
  assert.match(source, /Ika-category-list/);
  assert.match(source, /router\.replace\(categoriesHref\(1, view, query\)\)/);
  assert.match(pageSource, /getAdminCategoryPage/);
});

test("Category creation has a dedicated editable route without image controls", () => {
  const routeSource = readFileSync(path.join(process.cwd(), "app/admin/categories/new/page.tsx"), "utf8");
  const editorSource = readFileSync(path.join(process.cwd(), "components/admin/CategoryEditor.tsx"), "utf8");

  assert.match(routeSource, /AdminNewCategoryPage/);
  assert.doesNotMatch(editorSource, /uploadAdminImage|type="file"|Category image/);
  assert.match(editorSource, /createCategory/);
  assert.match(editorSource, /updateCategory/);
  assert.match(editorSource, /Category name \(English\)/);
  assert.match(editorSource, /Category name \(Arabic\)/);
});

test("category names follow the selected locale and fall back to French", () => {
  const category = {
    name: "Rouleaux de sushi",
    translations: makeCategoryTranslations("Rouleaux de sushi", "Sushi rolls", "لفائف السوشي"),
  };

  assert.equal(localizeCategoryName(category, "fr"), "Rouleaux de sushi");
  assert.equal(localizeCategoryName(category, "en"), "Sushi rolls");
  assert.equal(localizeCategoryName(category, "ar"), "لفائف السوشي");
  assert.equal(localizeCategoryName({ name: "Catégorie existante" }, "en"), "Catégorie existante");
});
