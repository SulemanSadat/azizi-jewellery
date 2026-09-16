const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Builds a public asset URL that works with the configured Next.js basePath. */
export function publicAsset(path: `/${string}`): string {
  return `${basePath}${path}`;
}
