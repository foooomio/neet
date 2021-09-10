const assets = new Map<string, HeadersInit>([
  ["/apple-touch-icon.png", { "content-type": "image/png" }],
  ["/favicon.ico", { "content-type": "image/x-icon" }],
  ["/style.css", { "content-type": "text/css" }],
]);

export function hasAsset(url: URL): boolean {
  return assets.has(url.pathname);
}

export async function getAsset(url: URL): Promise<Response> {
  const file = await Deno.readFile("./assets" + url.pathname);

  return new Response(file, {
    headers: assets.get(url.pathname),
  });
}
