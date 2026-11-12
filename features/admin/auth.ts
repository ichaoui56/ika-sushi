import "server-only";
import { getCurrentUser } from "../../lib/auth/session";

export async function getActiveAdmin() {
  const user = await getCurrentUser();
  return user?.role === "ADMIN" ? user : null;
}