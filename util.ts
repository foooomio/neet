import { crypto } from "https://deno.land/std@0.112.0/crypto/mod.ts";

export async function md5(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("MD5", data);
  const array = [...new Uint8Array(hash)];
  return array.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function validate(
  date: string | undefined,
  hash: string | undefined,
  secret: string | undefined,
): Promise<boolean> {
  return !!date && !!hash && await md5(date + secret) === hash;
}

export function parsePath(pathname: string): { date?: string; hash?: string } {
  const regexp = /^\/([0-9]{8})\/([0-9a-f]{32})$/;

  const [, date, hash] = pathname.match(regexp) ?? [];

  return { date, hash };
}
