import { stripLocalePrefix } from "@/lib/i18n/paths";

export function isGrok47Path(pathname: string) {
  const path = stripLocalePrefix(pathname);
  return path === "/grok-4-7" || path.startsWith("/grok-4-7/");
}
