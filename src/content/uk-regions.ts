export type UkRegionSlug = "england" | "scotland" | "wales";

export interface UkRegionPage {
  name: "England" | "Scotland" | "Wales";
  slug: UkRegionSlug;
  title: string;
  description: string;
  introduction: string;
  routePlanning: string;
  capacityContext: string;
  operatorChecks: string[];
  loadProviderChecks: string[];
  sources: Array<{ href: string; label: string }>;
}

export const UK_REGION_PAGES: Record<UkRegionSlug, UkRegionPage> = {
  england: {
    name: "England",
    slug: "england",
    title: "Owner-Driver and Haulage Capacity in England | ODE",
    description: "Share dated vehicle capacity in England or contact Owner Driver Exchange with a specific transport requirement for review.",
    introduction: "Owner Driver Exchange accepts capacity and transport enquiries involving locations throughout England. Operators can share where a vehicle is and when it is available; load providers can contact the team with a specific collection and delivery requirement.",
    routePlanning: "England's motorway and major A-road network connects dense urban areas, ports, industrial sites and distribution locations. The useful planning detail is the actual collection and delivery site: access, loading arrangements, delivery slots, road restrictions and current disruption can matter more than the nearest town.",
    capacityContext: "An England capacity submission records a current location and date range for private review. It is not placed on a public map or live load board, and it does not create a job, rate or booking.",
    operatorChecks: ["Current town, city or postcode area", "Available-from and available-until dates", "Vehicle and direction notes", "Urban access or clean-air-zone considerations"],
    loadProviderChecks: ["Exact collection and delivery sites", "Loading and delivery appointments", "Freight dimensions and weight", "Any route, access or timing constraint"],
    sources: [
      { href: "https://www.gov.uk/traffic-information", label: "Official traffic and roadworks information" },
      { href: "https://www.gov.uk/clean-air-zones", label: "GOV.UK clean-air-zone checker" },
    ],
  },
  scotland: {
    name: "Scotland",
    slug: "scotland",
    title: "Owner-Driver and Haulage Capacity in Scotland | ODE",
    description: "Share dated vehicle capacity in Scotland or prepare a specific Scottish transport requirement for direct review.",
    introduction: "Owner Driver Exchange accepts capacity and transport enquiries involving mainland locations throughout Scotland. The route may involve a city or a rural destination, so the exact sites and dates are essential. Ferry-dependent movements are outside the service scope.",
    routePlanning: "Transport Scotland describes a diverse trunk-road network connecting major cities, towns, airports and ports, with routes ranging from motorways to single-carriageway sections. Journey timing, weather and local-road access therefore need to be checked for the actual mainland movement.",
    capacityContext: "A Scotland capacity submission tells the team where a vehicle is available and for what period. Suitability for a particular mainland route, load or delivery window is confirmed separately.",
    operatorChecks: ["Precise current location", "Real availability dates", "Intended direction or operating area", "Weather and rural-road constraints"],
    loadProviderChecks: ["Full collection and delivery locations", "Required dates and appointment windows", "Freight and handling detail", "Mainland route and access constraints"],
    sources: [
      { href: "https://www.transport.gov.scot/transport-network/roads/the-trunk-road-network/", label: "Transport Scotland trunk-road network" },
      { href: "https://www.transport.gov.scot/our-approach/industry-guidance/freight-transport/", label: "Transport Scotland freight guidance" },
    ],
  },
  wales: {
    name: "Wales",
    slug: "wales",
    title: "Owner-Driver and Haulage Capacity in Wales | ODE",
    description: "Share dated vehicle capacity in Wales or contact Owner Driver Exchange with a specific Welsh transport requirement.",
    introduction: "Owner Driver Exchange accepts capacity and transport enquiries involving locations throughout Wales, including movements that cross the border with England. The enquiry should identify the real sites rather than treating Wales as one uniform operating area.",
    routePlanning: "Welsh movements can combine strategic roads, cross-border links and local access into industrial, rural or urban sites. Current conditions on the strategic network, site booking arrangements and the final local-road approach should be checked close to the movement date.",
    capacityContext: "A Wales capacity submission is a dated private enquiry. It does not advertise a live vehicle, promise a return load or establish suitability for every Welsh route.",
    operatorChecks: ["Current Welsh location or postcode area", "Availability window", "Direction of travel", "Local access and live route conditions"],
    loadProviderChecks: ["Collection and delivery postcodes", "Cross-border or within-Wales route context", "Site access and booking rules", "Freight, dimensions and weight"],
    sources: [
      { href: "https://traffic.wales/traffic-conditions", label: "Traffic Wales conditions" },
      { href: "https://www.gov.wales/road-freight", label: "Welsh Government road-freight information" },
    ],
  },
};

export const UK_REGION_LIST = Object.values(UK_REGION_PAGES);
