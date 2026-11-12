import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

test("Staff manager provides list/cards, search, pagination, and non-reloading status updates", () => {
  const source = readFileSync(path.join(process.cwd(), "components/admin/StaffManager.tsx"), "utf8");
  const pageSource = readFileSync(path.join(process.cwd(), "components/admin/pages/AdminEmployeesPage.tsx"), "utf8");

  assert.match(source, /Ika-staff-card-grid/);
  assert.match(source, /Ika-staff-list/);
  assert.match(source, /Ika-staff-pagination/);
  assert.match(source, /router\.replace\(employeesHref\(1, view, query\)\)/);
  assert.match(source, /router\.refresh\(\)/);
  assert.match(pageSource, /getStaffUserPage/);
});

test("New staff form includes role-specific permission controls and its own route", () => {
  const formSource = readFileSync(path.join(process.cwd(), "components/admin/StaffForm.tsx"), "utf8");
  const routeSource = readFileSync(path.join(process.cwd(), "app/admin/employees/new/page.tsx"), "utf8");

  assert.match(routeSource, /AdminNewEmployeePage/);
  assert.match(formSource, /permissionGroups/);
  assert.match(formSource, /role === "EMPLOYEE" \? permissions : \[\]/);
  assert.match(formSource, /Temporary password/);
});
