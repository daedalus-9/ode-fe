import { SeoHead } from "@/components/seo/SeoHead";
import { POSTCODE_AREAS } from "@/content/gb-hubs";
import Link from "next/link";

const title = "Haulage Capacity by Postcode Area | ODE";
const description = "Browse road-haulage enquiry guidance for selected postcode areas in England, mainland Scotland and Wales.";

export default function HaulagePostcodesIndexPage() {
  return (
    <main id="main-content" className="bg-zinc-950 text-zinc-100">
      <SeoHead title={title} description={description} path="/haulage-postcodes/" />
      <section className="border-b border-zinc-800 bg-black py-20"><div className="mx-auto max-w-6xl px-5 sm:px-8"><nav aria-label="Breadcrumb" className="text-sm text-zinc-500"><Link href="/" className="hover:text-amber-300">Home</Link><span aria-hidden="true"> / </span><span className="text-zinc-300">Postcode areas</span></nav><p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-amber-300">Road-freight location directory</p><h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">Haulage-capacity enquiries by postcode area</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">Start with the outward postcode letters, then provide the complete collection and delivery postcodes privately. These pages cover selected road-freight hubs in England, mainland Scotland and Wales and exclude ferry-dependent locations.</p></div></section>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8"><h2 className="text-3xl font-bold text-white">Choose a postcode area</h2><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{POSTCODE_AREAS.map((area) => <Link key={area.slug} href={`/haulage-postcodes/${area.slug}/`} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 hover:border-amber-300"><strong className="text-xl text-white">{area.code}</strong><span className="mt-2 block text-sm leading-6 text-zinc-400">{area.hubs.map((hub) => hub.name).join(" and ")} · {area.nations.join(" / ")}</span></Link>)}</div></section>
    </main>
  );
}
