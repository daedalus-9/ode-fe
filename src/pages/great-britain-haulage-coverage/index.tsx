import { SeoHead } from "@/components/seo/SeoHead";
import { GB_HUBS, POSTCODE_AREAS } from "@/content/gb-hubs";
import { UK_REGION_LIST } from "@/content/uk-regions";
import Link from "next/link";

const title = "England, Scotland and Wales Haulage Coverage | ODE";
const description = "Explore road-haulage capacity enquiries across England, mainland Scotland and Wales, including city lanes and postcode-area guidance.";

export default function GreatBritainHaulageCoveragePage() {
  return (
    <main id="main-content" className="bg-zinc-950 text-zinc-100">
      <SeoHead title={title} description={description} path="/great-britain-haulage-coverage/" />
      <section className="border-b border-zinc-800 bg-black py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">Road coverage</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">Haulage-capacity enquiries across England, Scotland and Wales</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">Owner Driver Exchange accepts dated vehicle-capacity and transport enquiries across England, mainland Scotland and Wales. Every movement must be possible by road without a ferry.</p>
          <div className="mt-8 flex flex-wrap gap-4"><Link href="/haulage-routes/" className="rounded-full bg-amber-400 px-6 py-3.5 font-bold text-zinc-950 hover:bg-amber-300">Browse city routes</Link><Link href="/haulage-postcodes/" className="rounded-full border border-zinc-600 px-6 py-3.5 font-semibold text-white hover:border-amber-300">Browse postcode areas</Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">What coverage means</p><h2 className="mt-3 text-3xl font-bold text-white">A specific enquiry, not a live availability claim</h2><p className="mt-4 leading-7 text-zinc-400">Operators can submit current location and dates. Businesses can send actual collection, delivery, timing and freight details. The team reviews the requirement; these pages do not claim that a vehicle, load, price or booking is currently available.</p></div><aside className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-7"><h2 className="text-2xl font-bold text-white">No ferry movements</h2><p className="mt-4 leading-7 text-zinc-300">Coverage is limited to road-accessible locations in England, mainland Scotland and Wales. Any collection or delivery that depends on a ferry is outside this ODE programme.</p></aside></div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900 py-16"><div className="mx-auto max-w-6xl px-5 sm:px-8"><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Country guidance</p><h2 className="mt-3 text-3xl font-bold text-white">Choose the relevant road network</h2><div className="mt-9 grid gap-5 md:grid-cols-3">{UK_REGION_LIST.map((region) => <article key={region.slug} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7"><h3 className="text-2xl font-bold text-white">{region.name}</h3><p className="mt-3 leading-7 text-zinc-400">{region.introduction}</p><Link href={`/return-loads-${region.slug}/`} className="mt-5 inline-flex font-bold text-amber-300 underline underline-offset-4">View {region.name} guidance</Link></article>)}</div></div></section>

      <section className="py-16"><div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 md:grid-cols-2"><article className="rounded-3xl border border-zinc-800 bg-black p-7"><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">{GB_HUBS.length} road hubs</p><h2 className="mt-3 text-2xl font-bold text-white">Directional city-lane pages</h2><p className="mt-4 leading-7 text-zinc-400">Select an origin and destination to see the two site contexts, the information needed and the correct enquiry route.</p><Link href="/haulage-routes/" className="mt-5 inline-flex font-bold text-amber-300 underline underline-offset-4">Explore city-to-city routes</Link></article><article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7"><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">{POSTCODE_AREAS.length} postcode areas</p><h2 className="mt-3 text-2xl font-bold text-white">Postcode-area starting points</h2><p className="mt-4 leading-7 text-zinc-400">Use a postcode-area guide to identify relevant hubs, then provide the full collection and delivery postcodes privately.</p><Link href="/haulage-postcodes/" className="mt-5 inline-flex font-bold text-amber-300 underline underline-offset-4">Explore postcode areas</Link></article></div></section>
    </main>
  );
}
