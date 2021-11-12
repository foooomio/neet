import "https://deno.land/x/dotenv@v3.1.0/load.ts";
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { getPage } from "./page.ts";
import { getOGImage } from "./og_image.ts";
import { getAsset, hasAsset } from "./asset.ts";

serve((request) => {
  const url = new URL(request.url);

  if (hasAsset(url)) {
    return getAsset(url);
  }

  if (url.pathname.startsWith("/og-image")) {
    return getOGImage(url);
  }

  return getPage(url);
});
