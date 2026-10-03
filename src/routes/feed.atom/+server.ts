import { generateAtomXml } from "#lib/rssGenerator.js";

export const prerender = true;

export async function GET() {
  return new Response(await generateAtomXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "max-age=0, s-maxage=3600"
    }
  });
}
