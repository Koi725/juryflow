/**
 * next/link drops the trailing slash unless the `trailingSlash` build option is active,
 * which it is not in unit tests. Compare routes without it.
 */
export function withoutTrailingSlash(route: string): string {
  return route.length > 1 ? route.replace(/\/$/, "") : route;
}
