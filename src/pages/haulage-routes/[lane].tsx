import { PlaceTruckForm } from "@/components/placeTruckForm/PlaceTruckForm";
import { OdeContactLink } from "@/components/contact/OdeContactLink";
import { SeoHead } from "@/components/seo/SeoHead";
import { GB_HUBS, NATION_SOURCES, laneSlug, parseLaneSlug, type FreightHub } from "@/content/gb-hubs";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

interface LanePageProps { origin: FreightHub; destination: FreightHub }

export default function HaulageLanePage({ origin, destination }: LanePageProps) {
  const slug = laneSlug(origin, destination);
  const path = `/haulage-routes/${slug}/`;
  const title = `${origin.name} to ${destination.name} Haulage Capacity | ODE`;
  const description = `Prepare a road-haulage capacity enquiry from ${origin.name} to ${destination.name}. Share genuine vehicle availability or send specific load details for review.`;
  const sameNation = origin.nation === destination.nation;
  const sources = Array.from(new Map([origin.nation, destination.nation].flatMap((nation) => NATION_SOURCES[nation]).map((source) => [source.href, source])).values());
  const related = GB_HUBS.filter((hub) => hub.slug !== origin.slug && hub.slug !== destination.slug).slice(0, 6);
  const emailSubject = encodeURIComponent(`${origin.name} to ${destination.name} transport requirement`);

  return (
    <main id="main-content" className="bg-zinc-950 text-zinc-100">
      <SeoHead title={title} description={description} path={path} />
      <section className="border-b border-zinc-800 bg-black py-20"><div className="mx-auto max-w-6xl px-5 sm:px-8"><nav aria-label="Breadcrumb" className="text-sm text-zinc-500"><Link href="/" className="hover:text-amber-300">Home</Link><span aria-hidden="true"> / </span><Link href="/haulage-routes/" className="hover:text-amber-300">City routes</Link><span aria-hidden="true"> / </span><span className="text-zinc-300">{origin.name} to {destination.name}</span></nav><p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-amber-300">Directional road-freight enquiry</p><h1 className="mt-4 max-w-5xl text-4xl font-bold tracking-tight sm:text-5xl">{origin.name} to {destination.name} haulage-capacity enquiries</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">Use this page to prepare a specific road movement or share genuine vehicle availability for the {origin.name} to {destination.name} direction. The page is not a live availability listing and does not promise a vehicle, load, rate or booking.</p><div className="mt-8 flex flex-wrap gap-4"><a href="#capacity-form" className="rounded-full bg-amber-400 px-6 py-3.5 font-bold text-zinc-950 hover:bg-amber-300">Share capacity on this lane</a><OdeContactLink action="email" subject={decodeURIComponent(emailSubject)} ariaLabel={`Email Owner Driver Exchange about a ${origin.name} to ${destination.name} load requirement`} className="rounded-full border border-zinc-600 px-6 py-3.5 font-semibold text-white hover:border-amber-300">Email a load requirement</OdeContactLink></div></div></section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:px-8 lg:grid-cols-2"><article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7"><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Collection: {origin.nation}</p><h2 className="mt-3 text-2xl font-bold text-white">Leaving {origin.name}</h2><p className="mt-4 leading-7 text-zinc-400">{origin.roadContext}</p><p className="mt-4 leading-7 text-zinc-300">{origin.siteChecks}</p><div className="mt-5 flex flex-wrap gap-2">{origin.postcodeAreas.map((area) => <Link key={area} href={`/haulage-postcodes/${area.toLowerCase()}/`} className="rounded-full border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:border-amber-300">{area} postcode area</Link>)}</div></article><article className="rounded-3xl border border-zinc-800 bg-black p-7"><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Delivery: {destination.nation}</p><h2 className="mt-3 text-2xl font-bold text-white">Arriving in {destination.name}</h2><p className="mt-4 leading-7 text-zinc-400">{destination.roadContext}</p><p className="mt-4 leading-7 text-zinc-300">{destination.siteChecks}</p><div className="mt-5 flex flex-wrap gap-2">{destination.postcodeAreas.map((area) => <Link key={area} href={`/haulage-postcodes/${area.toLowerCase()}/`} className="rounded-full border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:border-amber-300">{area} postcode area</Link>)}</div></article></section>

      <section className="border-y border-zinc-800 bg-zinc-900 py-16"><div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr]"><article><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Lane checklist</p><h2 className="mt-3 text-3xl font-bold text-white">Details needed before review</h2><ul className="mt-6 space-y-3 leading-7 text-zinc-400"><li>• Full collection address in or around {origin.name}, site contact and loading window</li><li>• Full delivery address in or around {destination.name}, booking slot and unloading arrangement</li><li>• Freight description, dimensions, weight and handling constraints</li><li>• Required dates, vehicle requirement and any time-critical limitation</li><li>• A road-only route with no ferry-dependent collection or delivery</li></ul></article><aside className="rounded-3xl border border-amber-400/25 bg-zinc-950 p-7"><h2 className="text-2xl font-bold text-white">{sameNation ? `Within ${origin.nation}` : `${origin.nation} to ${destination.nation}`}</h2><p className="mt-4 leading-7 text-zinc-400">{sameNation ? `Both sites are in ${origin.nation}, but local access and live road conditions still need checking.` : "This is a cross-border Great Britain movement. Collection and delivery requirements remain separate, and current conditions should be checked for both road networks."}</p><Link href={`/haulage-routes/${laneSlug(destination, origin)}/`} className="mt-5 inline-flex font-bold text-amber-300 underline underline-offset-4">View the reverse {destination.name} to {origin.name} lane</Link></aside></div></section>

      <section id="capacity-form" className="scroll-mt-24 py-16"><div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Private capacity enquiry</p><h2 className="mt-3 text-3xl font-bold text-white">Share current availability for this direction</h2><p className="mt-4 leading-7 text-zinc-400">Enter the vehicle's real current location and dates. The lane name is passed with the private enquiry for context; submission does not create a public listing.</p></div><PlaceTruckForm region={`${origin.name} to ${destination.name}`} /></div></section>

      <section className="border-t border-zinc-800 bg-black py-14"><div className="mx-auto max-w-6xl px-5 sm:px-8"><h2 className="text-2xl font-bold text-white">Other routes from {origin.name}</h2><div className="mt-5 flex flex-wrap gap-3">{related.map((hub) => <Link key={hub.slug} href={`/haulage-routes/${laneSlug(origin, hub)}/`} className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-300 hover:border-amber-300 hover:text-amber-300">To {hub.name}</Link>)}</div><div className="mt-8 border-t border-zinc-800 pt-7"><p className="text-sm font-semibold text-zinc-300">Official road-information sources</p><ul className="mt-3 space-y-2 text-sm">{sources.map((source) => <li key={source.href}><a href={source.href} className="text-amber-300 underline underline-offset-4">{source.label}</a></li>)}</ul></div></div></section>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({ paths: [], fallback: "blocking" });

export const getStaticProps: GetStaticProps<LanePageProps> = async ({ params }) => {
  const lane = typeof params?.lane === "string" ? parseLaneSlug(params.lane) : null;
  if (!lane) return { notFound: true };
  return { props: { origin: lane.origin, destination: lane.destination }, revalidate: 86400 };
};
