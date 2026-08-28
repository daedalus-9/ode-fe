import { ALL_LANES, POSTCODE_AREAS } from "@/content/gb-hubs";
import type { GetServerSideProps } from "next";

const origin = "https://www.ownerdriverexchange.co.uk";
const reviewedAt = "2026-08-28";
const staticPaths = [
  "/",
  "/how-it-works/",
  "/peak-period-haulage-capacity/",
  "/great-britain-haulage-coverage/",
  "/return-loads-england/",
  "/return-loads-scotland/",
  "/return-loads-wales/",
  "/haulage-routes/",
  "/haulage-postcodes/",
];

export function buildSitemapXml() {
  const paths = [
    ...staticPaths,
    ...ALL_LANES.map((lane) => `/haulage-routes/${lane.slug}/`),
    ...POSTCODE_AREAS.map((area) => `/haulage-postcodes/${area.slug}/`),
  ];
  const urls = paths.map((path) => `  <url><loc>${origin}${path}</loc><lastmod>${reviewedAt}</lastmod></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(buildSitemapXml());
  res.end();
  return { props: {} };
};

export default function Sitemap() { return null; }
