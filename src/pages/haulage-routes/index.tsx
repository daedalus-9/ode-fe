import { SeoHead } from "@/components/seo/SeoHead";
import { ALL_LANES, GB_HUBS, laneSlug } from "@/content/gb-hubs";
import Link from "next/link";

const title = "City-to-City Haulage Capacity Routes | ODE";
const description = "Browse directional road-haulage enquiry pages between freight hubs in England, mainland Scotland and Wales.";

export default function HaulageRoutesIndexPage() {
  return (
    <main id="main-content" className="bg-zinc-950 text-zinc-100">
      <SeoHead title={title} description={description} path="/haulage-routes/" />
      <section className="border-b border-zinc-800 bg-black py-20"><div className="mx-auto max-w-6xl px-5 sm:px-8"><nav aria-label="Breadcrumb" className="text-sm text-zinc-500"><Link href="/" className="hover:text-amber-300">Home</Link><span aria-hidden="true"> / </span><span className="text-zinc-300">City routes</span></nav><p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-amber-300">{ALL_LANES.length} directional road lanes</p><h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">City-to-city haulage-capacity enquiries</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">Choose a collection hub, then a delivery hub. Each page provides route-specific preparation and a real enquiry path. It does not display live vehicles or promise a match.</p><p className="mt-4 max-w-3xl rounded-2xl border border-amber-400/25 bg-amber-400/10 p-4 text-sm leading-6 text-zinc-300">Coverage is limited to road movements in England, mainland Scotland and Wales. Ferry-dependent movements are excluded.</p></div></section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8"><h2 className="text-3xl font-bold text-white">Browse by collection city</h2><p className="mt-4 max-w-3xl leading-7 text-zinc-400">All routes are directional because collection and delivery constraints differ. The reverse lane has its own preparation page.</p><div className="mt-10 space-y-4">{GB_HUBS.map((origin, index) => <details key={origin.slug} open={index < 3} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"><summary className="cursor-pointer text-xl font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400">From {origin.name} <span className="ml-2 text-sm font-normal text-zinc-500">to {GB_HUBS.length - 1} destinations</span></summary><div className="mt-5 flex flex-wrap gap-2">{GB_HUBS.filter((destination) => destination.slug !== origin.slug).map((destination) => <Link key={destination.slug} href={`/haulage-routes/${laneSlug(origin, destination)}/`} className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-300 hover:border-amber-300 hover:text-amber-300">{origin.name} to {destination.name}</Link>)}</div></details>)}</div></section>
    </main>
  );
}
