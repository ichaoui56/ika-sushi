import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

test("HeroManager includes the card-style slide gallery and add-slide action", () => {
  const source = readFileSync(path.join(process.cwd(), "components/admin/HeroManager.tsx"), "utf8");

  assert.match(source, /Add slide/i);
  assert.match(source, /Ika-hero-slide-card/i);
  assert.match(source, /Ika-hero-manager/i);
});
