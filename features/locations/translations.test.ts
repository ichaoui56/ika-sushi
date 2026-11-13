import assert from "node:assert/strict";
import test from "node:test";
import { locationSchema } from "./schemas";
import { localizeLocationName, makeLocationTranslations } from "./translations";
import { translate } from "../../components/i18n/translations";

test("location names accept French, English, and Arabic values", () => {
  const parsed = locationSchema.safeParse({
    name: "Maarif",
    nameEn: "Maarif",
    nameAr: "المعاريف",
  });
  assert.equal(parsed.success, true);
});

test("checkout location names follow the selected locale and fall back to French", () => {
  const location = {
    name: "Maarif",
    translations: makeLocationTranslations("Maarif", "Maarif", "المعاريف"),
  };

  assert.equal(localizeLocationName(location, "fr"), "Maarif");
  assert.equal(localizeLocationName(location, "en"), "Maarif");
  assert.equal(localizeLocationName(location, "ar"), "المعاريف");
  assert.equal(localizeLocationName({ name: "Maarif" }, "en"), "Maarif");
});

test("checkout delivery-zone labels are translated in all supported languages", () => {
  assert.equal(translate("Casablanca delivery zones", "fr"), "Zones de livraison à Casablanca");
  assert.equal(translate("Casablanca delivery zones", "en"), "Casablanca delivery zones");
  assert.equal(translate("Casablanca delivery zones", "ar"), "مناطق التوصيل في الدار البيضاء");
  assert.equal(translate("Selected delivery zone", "fr"), "Zone de livraison sélectionnée");
  assert.equal(translate("Selected delivery zone", "ar"), "منطقة التوصيل المختارة");
  assert.equal(translate("Delivery is not available in your area yet.", "ar"), "التوصيل غير متاح في منطقتك حاليًا.");
  assert.equal(translate("Delivery areas are temporarily unavailable.", "fr"), "Les zones de livraison sont temporairement indisponibles.");
  assert.equal(translate("Delivery areas are temporarily unavailable.", "en"), "Delivery areas are temporarily unavailable.");
  assert.equal(translate("Delivery areas are temporarily unavailable.", "ar"), "مناطق التوصيل غير متاحة مؤقتًا.");
  assert.equal(translate("Search delivery areas", "fr"), "Rechercher une zone de livraison");
  assert.equal(translate("Search delivery areas", "en"), "Search delivery areas");
  assert.equal(translate("Search delivery areas", "ar"), "ابحث عن منطقة توصيل");
  assert.equal(translate("View my orders", "fr"), "Voir mes commandes");
  assert.equal(translate("View my orders", "ar"), "عرض طلباتي");
});