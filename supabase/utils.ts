import { AuthUser } from "@supabase/supabase-js";

export function isAdmin(user: AuthUser) {
  return user.role === "service_role";
}
