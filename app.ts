import { getPage } from "./page.ts";
import { getOGImage } from "./og_image.ts";
import { getAsset, hasAsset } from "./asset.ts";

function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (hasAsset(url)) {
    return getAsset(url);
  }

  if (url.pathname.startsWith("/og-image")) {
    return getOGImage(url);
  }

  return getPage(url);
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
