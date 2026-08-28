const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
const defaultSiteUrl = process.env.NODE_ENV === "production"
  ? "https://www.ownerdriverexchange.co.uk"
  : "http://localhost:3000";

export const SITE_URL = configuredSiteUrl || defaultSiteUrl;

export function absoluteUrl(path = "/") {
  return new URL(path.startsWith("/") ? path : `/${path}`, SITE_URL).toString();
}

export const siteName = "Owner Driver Exchange";

export const defaultDescription =
  "Owner Driver Exchange provides information and enquiry routes for owner-drivers and transport businesses. Availability and suitability are confirmed case by case.";
