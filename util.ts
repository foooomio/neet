import { createHash } from "https://deno.land/std@0.106.0/hash/mod.ts";

export function md5(text: string): string {
  return createHash("md5").update(text).toString();
}

export function validate(
  date?: string,
  hash?: string,
  secret?: string,
): boolean {
  return !!date && !!hash && md5(date + secret) === hash;
}

export function parsePath(pathname: string): { date?: string; hash?: string } {
  const regexp = /^\/([0-9]{8})\/([0-9a-f]{32})$/;

  const [, date, hash] = pathname.match(regexp) ?? [];

  return { date, hash };
}
