const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const pageRoot = path.join(root, "src/pages");

for (const region of ["england", "scotland", "wales"]) {
  const leakedDir = path.join(pageRoot, `return-loads-${region}`, "hero");
  if (fs.existsSync(leakedDir) && fs.readdirSync(leakedDir).length > 0) {
    throw new Error(`Leaked page files remain: ${leakedDir}`);
  }
}

const robots = read("public/robots.txt");
if (!robots.includes("Sitemap: https://www.ownerdriverexchange.co.uk/sitemap.xml")) {
  throw new Error("Robots sitemap points at the wrong site");
}
if (robots.includes("returnloadsuk")) throw new Error("Return Loads UK crawl reference remains");

const sitemap = read("src/pages/sitemap.xml.tsx");
for (const route of ["/great-britain-haulage-coverage/", "/return-loads-england/", "/return-loads-scotland/", "/return-loads-wales/", "/haulage-routes/", "/haulage-postcodes/"]) {
  if (!sitemap.includes(route)) throw new Error(`Sitemap source missing ${route}`);
}
for (const generatedCollection of ["ALL_LANES", "POSTCODE_AREAS"]) {
  if (!sitemap.includes(generatedCollection)) throw new Error(`Sitemap generator missing ${generatedCollection}`);
}
if (fs.existsSync(path.join(root, "public/sitemap.xml"))) throw new Error("Static sitemap conflicts with generated sitemap route");
if (!read("src/lib/seo.ts").includes('process.env.NODE_ENV === "production"')) {
  throw new Error("Production canonical fallback guard is missing");
}

const peakPage = read("src/pages/peak-period-haulage-capacity/index.tsx");
for (const requiredCopy of ["Christmas 2026", "do not state that Owner Driver Exchange currently has work", 'path="/peak-period-haulage-capacity/"']) {
  if (!peakPage.includes(requiredCopy)) throw new Error(`Peak-capacity safeguard missing: ${requiredCopy}`);
}

const config = read("next.config.mjs");
if (config.includes("X-Robots-Tag")) throw new Error("Conflicting global robots header remains");
for (const component of ["Content", "GradientGrid"]) {
  if (!config.includes(component)) throw new Error(`Retired route redirect missing ${component}`);
}

for (const endpoint of ["place-truck", "partner-join"]) {
  if (!read(`src/components/${endpoint === "place-truck" ? "placeTruckForm/PlaceTruckForm" : "partnerJoinForm/PartnerJoinForm"}.tsx`).includes(endpoint)) {
    throw new Error(`Missing backend endpoint contract: ${endpoint}`);
  }
}

const truckForm = read("src/components/placeTruckForm/PlaceTruckForm.tsx");
for (const field of ["fullname", "email", "phone", "location", "availableFrom", "availableUntil", "companyname", "message", "optOutEmails", "region"]) {
  if (!truckForm.includes(field)) throw new Error(`Truck payload field missing: ${field}`);
}
const partnerForm = read("src/components/partnerJoinForm/PartnerJoinForm.tsx");
for (const field of ["fullname", "email", "phoneNumber", "optOut", "region"]) {
  if (!partnerForm.includes(field)) throw new Error(`Partner payload field missing: ${field}`);
}

const seoHead = read("src/components/seo/SeoHead.tsx");
if (!seoHead.includes('noindex ? "noindex, follow"')) {
  throw new Error("Page-level noindex policy missing");
}
for (const file of ["src/pages/privacy-policy/index.tsx"]) {
  if (!read(file).includes("noindex")) throw new Error(`Expected noindex missing: ${file}`);
}
if (!config.includes('source: "/signin/"')) {
  throw new Error("Retired sign-in route must redirect to a working journey");
}
for (const form of [truckForm, partnerForm]) {
  for (const attributionField of ['sourceSite: "Owner Driver Exchange"', "sourceUrl", "submissionId"]) {
    if (!form.includes(attributionField)) throw new Error(`Attribution field missing: ${attributionField}`);
  }
}

const regionalComponent = read("src/components/regional/RegionalReviewPage.tsx");
if (regionalComponent.includes("noindex")) throw new Error("Indexable regional component still sets noindex");
const regionRegistry = read("src/content/uk-regions.ts");
for (const region of ["England", "Scotland", "Wales"]) {
  if (!regionRegistry.includes(region)) throw new Error(`Regional coverage missing: ${region}`);
}
for (const safeguard of ["Ferry-dependent movements are outside", "mainland locations throughout Scotland"]) {
  if (!regionRegistry.includes(safeguard)) throw new Error(`Regional service boundary missing: ${safeguard}`);
}
for (const file of [
  "src/pages/return-loads-england/index.tsx",
  "src/pages/return-loads-scotland/index.tsx",
  "src/pages/return-loads-wales/index.tsx",
  "src/pages/great-britain-haulage-coverage/index.tsx",
  "src/pages/haulage-routes/index.tsx",
  "src/pages/haulage-routes/[lane].tsx",
  "src/pages/haulage-postcodes/index.tsx",
  "src/pages/haulage-postcodes/[area].tsx",
  "src/pages/sitemap.xml.tsx",
]) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Coverage route missing: ${file}`);
}
if (fs.existsSync(path.join(root, "src/pages/return-loads-northern-ireland/index.tsx"))) throw new Error("Northern Ireland remains in the ODE route architecture");

const hubs = JSON.parse(read("src/content/gb-hubs.json"));
if (hubs.length !== 32) throw new Error(`Expected 32 reviewed Great Britain hubs, found ${hubs.length}`);
if (hubs.some((hub) => !["England", "Scotland", "Wales"].includes(hub.nation))) throw new Error("Non-GB hub entered programmatic registry");
if (new Set(hubs.map((hub) => hub.slug)).size !== hubs.length) throw new Error("Duplicate programmatic hub slug");
if (hubs.some((hub) => !hub.roadContext || !hub.siteChecks || !hub.postcodeAreas.length)) throw new Error("Incomplete programmatic hub evidence");
const laneCount = hubs.length * (hubs.length - 1);
const postcodeCount = new Set(hubs.flatMap((hub) => hub.postcodeAreas)).size;
if (laneCount !== 992 || postcodeCount < 35) throw new Error(`Unexpected publication counts: ${laneCount} lanes, ${postcodeCount} postcode areas`);
const lanePage = read("src/pages/haulage-routes/[lane].tsx");
for (const safeguard of ["fallback: \"blocking\"", "does not promise a vehicle, load, rate or booking", "no ferry-dependent collection or delivery", "PlaceTruckForm"]) {
  if (!lanePage.includes(safeguard)) throw new Error(`Programmatic lane safeguard missing: ${safeguard}`);
}
const postcodePage = read("src/pages/haulage-postcodes/[area].tsx");
for (const safeguard of ["Complete collection and delivery postcodes", "Ferry-dependent addresses are excluded", "PlaceTruckForm"]) {
  if (!postcodePage.includes(safeguard)) throw new Error(`Postcode-area safeguard missing: ${safeguard}`);
}

const home = read("src/pages/index.tsx");
for (const unsupportedModule of ["Stats", "Customers", "Carousel", "TrustedAcrossUK"]) {
  if (home.includes(`/${unsupportedModule}`) || home.includes(`<${unsupportedModule}`)) {
    throw new Error(`Unsupported homepage module remains: ${unsupportedModule}`);
  }
}

const backendPath = path.resolve(root, "../../logic-freight/logic_be/routes.js");
const backend = fs.readFileSync(backendPath, "utf8");
for (const route of ["place-truck", "partner-join"]) {
  if (!backend.includes(`\"/${route}\"`)) throw new Error(`Shared backend route missing: ${route}`);
}
for (const field of ["fullname", "email", "location", "availableFrom", "phoneNumber"]) {
  if (!backend.includes(field)) throw new Error(`Shared backend field missing: ${field}`);
}

console.log("Owner Driver Exchange SEO validation passed");
