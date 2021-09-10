import { calcTotal, parseYMD } from "./date.ts";
import { parsePath, validate } from "./util.ts";

export async function getOGImage(url: URL): Promise<Response> {
  const { date, hash } = parsePath(url.pathname.replace("/og-image", ""));

  if (!validate(date, hash, Deno.env.get("SECRET"))) {
    return new Response(undefined, { status: 400 });
  }

  const total = calcTotal(parseYMD(date!));

  const imageUrl = [
    "https://res.cloudinary.com",
    Deno.env.get("CLOUD_NAME"),
    "image/upload",
    "l_text:notosansjp-bold.otf_300_bold:" + total,
    "og-image-base.png",
  ].join("/");

  const response = await fetch(imageUrl);

  if (!response.ok) {
    return new Response(undefined, { status: 500 });
  }

  return new Response(await response.blob(), {
    headers: { "content-type": "image/png" },
  });
}
