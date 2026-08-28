import { PlaceTruckForm } from "@/components/placeTruckForm/PlaceTruckForm";
import { SeoHead } from "@/components/seo/SeoHead";
import { UK_REGION_LIST, UK_REGION_PAGES, type UkRegionSlug } from "@/content/uk-regions";
import Link from "next/link";
import { OdeContactLink } from "@/components/contact/OdeContactLink";

export function RegionalReviewPage({ slug }: { slug: UkRegionSlug }) {
  const page = UK_REGION_PAGES[slug];
  const path = `/return-loads-${page.slug}/`;
  const related = UK_REGION_LIST.filter((region) => region.slug !== slug);

  return (
    <main id="main-content" className="bg-zinc-950 text-zinc-100">
      <SeoHead title={page.title} description={page.description} path={path} />
      <section className="border-b border-zinc-800 bg-black py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-zinc-500"><Link href="/" className="hover:text-amber-300">Home</Link><span aria-hidden="true"> / </span><Link href="/great-britain-haulage-coverage/" className="hover:text-amber-300">Great Britain coverage</Link><span aria-hidden="true"> / </span><span className="text-zinc-300">{page.name}</span></nav>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-amber-300">Owner-confirmed regional coverage</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">Share vehicle capacity in {page.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">{page.introduction}</p>
          <div className="mt-8 flex flex-wrap gap-4"><a href="#capacity-form" className="rounded-full bg-amber-400 px-6 py-3.5 font-bold text-zinc-950 hover:bg-amber-300">Share {page.name} capacity</a><Link href="/how-it-works/" className="rounded-full border border-zinc-600 px-6 py-3.5 font-semibold text-white hover:border-amber-300">How enquiries work</Link></div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2">
        <article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7 sm:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Route context</p>
          <h2 className="mt-3 text-2xl font-bold text-white">Plan from the actual sites</h2>
          <p className="mt-4 leading-7 text-zinc-400">{page.routePlanning}</p>
        </article>
        <article className="rounded-3xl border border-zinc-800 bg-black p-7 sm:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Capacity context</p>
          <h2 className="mt-3 text-2xl font-bold text-white">A dated enquiry, not a live listing</h2>
          <p className="mt-4 leading-7 text-zinc-400">{page.capacityContext}</p>
        </article>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 md:grid-cols-2">
          <article><h2 className="text-2xl font-bold text-white">Information for an operator</h2><ul className="mt-5 space-y-3 leading-7 text-zinc-400">{page.operatorChecks.map((item) => <li key={item}>• {item}</li>)}</ul></article>
          <article><h2 className="text-2xl font-bold text-white">Information for a load provider</h2><ul className="mt-5 space-y-3 leading-7 text-zinc-400">{page.loadProviderChecks.map((item) => <li key={item}>• {item}</li>)}</ul><OdeContactLink action="email" subject={`${page.name} transport capacity enquiry`} ariaLabel={`Email Owner Driver Exchange about a ${page.name} transport requirement`} className="mt-6 inline-flex font-bold text-amber-300 underline underline-offset-4">Email a specific requirement</OdeContactLink></article>
        </div>
      </section>

      <section id="capacity-form" className="scroll-mt-24 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Private capacity enquiry</p><h2 className="mt-3 text-3xl font-bold text-white">Share current details for review</h2><p className="mt-4 leading-7 text-zinc-400">Use current location and real availability dates. A successful response means the backend accepted the details; it does not confirm work, a rate, suitability or a booking.</p></div>
          <PlaceTruckForm region={page.name} />
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-black py-14">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="text-2xl font-bold text-white">Other Great Britain coverage pages</h2>
          <div className="mt-5 flex flex-wrap gap-3">{related.map((region) => <Link key={region.slug} href={`/return-loads-${region.slug}/`} className="rounded-full border border-zinc-700 px-5 py-2.5 font-semibold text-zinc-200 hover:border-amber-300 hover:text-amber-300">{region.name}</Link>)}</div>
          <div className="mt-8 border-t border-zinc-800 pt-7"><p className="text-sm font-semibold text-zinc-300">Official planning sources</p><ul className="mt-3 space-y-2 text-sm">{page.sources.map((source) => <li key={source.href}><a href={source.href} className="text-amber-300 underline underline-offset-4">{source.label}</a></li>)}</ul></div>
        </div>
      </section>
    </main>
  );
}
