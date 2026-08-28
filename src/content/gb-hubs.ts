import hubData from "./gb-hubs.json";

export type GbNation = "England" | "Scotland" | "Wales";

export interface FreightHub {
  slug: string;
  name: string;
  nation: GbNation;
  postcodeAreas: string[];
  roadContext: string;
  siteChecks: string;
}

export interface PostcodeArea {
  slug: string;
  code: string;
  nations: GbNation[];
  hubs: FreightHub[];
}

export const GB_HUBS = hubData as FreightHub[];
export const GB_HUB_BY_SLUG = Object.fromEntries(GB_HUBS.map((hub) => [hub.slug, hub])) as Record<string, FreightHub>;

export const POSTCODE_AREAS: PostcodeArea[] = Array.from(new Set(GB_HUBS.flatMap((hub) => hub.postcodeAreas)))
  .sort((a, b) => a.localeCompare(b))
  .map((code) => {
    const hubs = GB_HUBS.filter((hub) => hub.postcodeAreas.includes(code));
    return {
      slug: code.toLowerCase(),
      code,
      nations: Array.from(new Set(hubs.map((hub) => hub.nation))),
      hubs,
    };
  });

export const POSTCODE_AREA_BY_SLUG = Object.fromEntries(POSTCODE_AREAS.map((area) => [area.slug, area])) as Record<string, PostcodeArea>;

export function laneSlug(origin: FreightHub, destination: FreightHub) {
  return `${origin.slug}-to-${destination.slug}`;
}

export function parseLaneSlug(value: string) {
  const splitAt = value.indexOf("-to-");
  if (splitAt < 1) return null;
  const origin = GB_HUB_BY_SLUG[value.slice(0, splitAt)];
  const destination = GB_HUB_BY_SLUG[value.slice(splitAt + 4)];
  if (!origin || !destination || origin.slug === destination.slug) return null;
  return { origin, destination, slug: value };
}

export const ALL_LANES = GB_HUBS.flatMap((origin) =>
  GB_HUBS.filter((destination) => destination.slug !== origin.slug).map((destination) => ({
    origin,
    destination,
    slug: laneSlug(origin, destination),
  })),
);

export const NATION_SOURCES: Record<GbNation, Array<{ href: string; label: string }>> = {
  England: [
    { href: "https://www.gov.uk/traffic-information", label: "GOV.UK traffic and roadworks information" },
    { href: "https://www.gov.uk/clean-air-zones", label: "GOV.UK clean-air-zone checker" },
  ],
  Scotland: [
    { href: "https://www.transport.gov.scot/transport-network/roads/the-trunk-road-network/", label: "Transport Scotland trunk-road network" },
  ],
  Wales: [
    { href: "https://traffic.wales/traffic-conditions", label: "Traffic Wales current conditions" },
    { href: "https://www.gov.wales/road-freight", label: "Welsh Government road-freight information" },
  ],
};
