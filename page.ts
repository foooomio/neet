import { calcTotal, calcYears, formatYMD } from "./date.ts";
import { md5, parsePath, validate } from "./util.ts";

export async function getPage(url: URL): Promise<Response> {
  const { date, hash } = parsePath(url.pathname);

  const today = new Date();

  const todayYMD = formatYMD(today);
  const todayHash = md5(todayYMD + Deno.env.get("SECRET"));

  const total = calcTotal(today);
  const { years, days } = calcYears(today);

  const data = new Map([
    ["total", total.toString()],
    ["years_text", days === 0 ? `ちょうど ${years} 年` : `${years} 年 と ${days} 日`],
    ["tweet_url", `https://neet.foooomio.net/${todayYMD}/${todayHash}`],
  ]);

  if (validate(date, hash, Deno.env.get("SECRET"))) {
    data.set(
      "og_image_url",
      `https://neet.foooomio.net/og-image/${date}/${hash}`,
    );
  }

  let html = await Deno.readTextFile("./assets/template.html");
  data.forEach((value, key) => {
    html = html.replaceAll(`{{${key}}}`, value);
  });

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
