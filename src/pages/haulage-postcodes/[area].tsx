import { PlaceTruckForm } from "@/components/placeTruckForm/PlaceTruckForm";
import { SeoHead } from "@/components/seo/SeoHead";
import { GB_HUBS, POSTCODE_AREAS, POSTCODE_AREA_BY_SLUG, laneSlug, type PostcodeArea } from "@/content/gb-hubs";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

interface PostcodeAreaPageProps { area: PostcodeArea }

export default function PostcodeAreaPage({ area }: PostcodeAreaPageProps) {
  const path = `/haulage-postcodes/${area.slug}/`;
  const hubNames = area.hubs.map((hub) => hub.name).join(" and ");
  const title = `${area.code} Postcode Area Haulage Capacity | ODE`;
  const description = `Prepare a road-haulage capacity enquiry involving the ${area.code} postcode area around ${hubNames}. Share current vehicle details for review.`;
  const destinations = GB_HUBS.filter((hub) => !area.hubs.some((areaHub) => areaHub.slug === hub.slug)).slice(0, 12);

  return (
    <main id="main-content" className="bg-zinc-950 text-zinc-100">
      <SeoHead title={title} description={description} path={path} />
      <section className="border-b border-zinc-800 bg-black py-20"><div className="mx-auto max-w-6xl px-5 sm:px-8"><nav aria-label="Breadcrumb" className="text-sm text-zinc-500"><Link href="/" className="hover:text-amber-300">Home</Link><span aria-hidden="true"> / </span><Link href="/haulage-postcodes/" className="hover:text-amber-300">Postcode areas</Link><span aria-hidden="true"> / </span><span className="text-zinc-300">{area.code}</span></nav><p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-amber-300">{area.nations.join(" / ")} road coverage</p><h1 className="mt-4 max-w-5xl text-4xl font-bold tracking-tight sm:text-5xl">Haulage-capacity enquiries in the {area.code} postcode area</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">Use the {area.code} area as a starting point for an enquiry around {hubNames}. The full collection and delivery postcodes, dates and freight details are still required before suitability can be reviewed.</p><a href="#capacity-form" className="mt-8 inline-flex rounded-full bg-amber-400 px-6 py-3.5 font-bold text-zinc-950 hover:bg-amber-300">Share capacity in {area.code}</a></div></section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:px-8 md:grid-cols-2">{area.hubs.map((hub) => <article key={hub.slug} className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7"><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Road hub</p><h2 className="mt-3 text-2xl font-bold text-white">{hub.name}</h2><p className="mt-4 leading-7 text-zinc-400">{hub.roadContext}</p><p className="mt-4 leading-7 text-zinc-300">{hub.siteChecks}</p></article>)}</section>

      <section className="border-y border-zinc-800 bg-zinc-900 py-16"><div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr]"><article><h2 className="text-3xl font-bold text-white">What to include</h2><ul className="mt-6 space-y-3 leading-7 text-zinc-400"><li>• Complete collection and delivery postcodes, not only {area.code}</li><li>• Site names, access instructions and appointment windows</li><li>• Freight description, dimensions, weight and handling needs</li><li>• Vehicle details, current location and genuine availability dates</li><li>• Confirmation that neither site requires a ferry movement</li></ul></article><aside className="rounded-3xl border border-amber-400/25 bg-zinc-950 p-7"><h2 className="text-2xl font-bold text-white">Area-code limitation</h2><p className="mt-4 leading-7 text-zinc-400">A postcode area can cover more than one locality and does not prove that every address is suitable or in scope. Ferry-dependent addresses are excluded even when they share an area code shown here.</p></aside></div></section>

      <section id="capacity-form" className="scroll-mt-24 py-16"><div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Private capacity enquiry</p><h2 className="mt-3 text-3xl font-bold text-white">Share current {area.code} area availability</h2><p className="mt-4 leading-7 text-zinc-400">The postcode-area context is passed with the private enquiry. It is not published as a live vehicle listing and does not confirm a load or rate.</p></div><PlaceTruckForm region={`${area.code} postcode area`} /></div></section>

      <section className="border-t border-zinc-800 bg-black py-14"><div className="mx-auto max-w-6xl px-5 sm:px-8"><h2 className="text-2xl font-bold text-white">Example road lanes from {hubNames}</h2><div className="mt-5 flex flex-wrap gap-3">{area.hubs.flatMap((origin) => destinations.slice(0, 6).map((destination) => <Link key={`${origin.slug}-${destination.slug}`} href={`/haulage-routes/${laneSlug(origin, destination)}/`} className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-300 hover:border-amber-300 hover:text-amber-300">{origin.name} to {destination.name}</Link>))}</div></div></section>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({ paths: POSTCODE_AREAS.map((area) => ({ params: { area: area.slug } })), fallback: false });

export const getStaticProps: GetStaticProps<PostcodeAreaPageProps> = async ({ params }) => {
  const area = typeof params?.area === "string" ? POSTCODE_AREA_BY_SLUG[params.area] : null;
  if (!area) return { notFound: true };
  return { props: { area } };
};
