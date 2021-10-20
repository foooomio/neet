import { listenAndServe } from "https://deno.land/std@0.112.0/http/server.ts";
import { getPage } from "./page.ts";
import { getOGImage } from "./og_image.ts";
import { getAsset, hasAsset } from "./asset.ts";

async function handleRequest(request: Request): Promise<Response> {
  if (!Deno.env.get("DENO_DEPLOYMENT_ID")) {
    await import("https://deno.land/x/dotenv@v3.0.0/load.ts");
  }

  const url = new URL(request.url);

  if (hasAsset(url)) {
    return getAsset(url);
  }

  if (url.pathname.startsWith("/og-image")) {
    return getOGImage(url);
  }

  return getPage(url);
}

await listenAndServe(":8080", handleRequest);
