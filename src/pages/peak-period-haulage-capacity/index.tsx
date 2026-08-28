import { SeoHead } from "@/components/seo/SeoHead";
import Link from "next/link";
import { OdeContactLink } from "@/components/contact/OdeContactLink";

const title = "Peak-Period Haulage Capacity Planning | Owner Driver Exchange";
const description =
  "Practical guidance for sharing dated vehicle capacity and preparing transport requirements around UK seasonal and retail peaks.";

const periods = [
  ["January and winter", "Returns, stock repositioning, shorter daylight and adverse-weather contingencies."],
  ["Spring", "Easter, garden and construction demand, agricultural inputs and shorter bank-holiday weeks."],
  ["Summer", "Beverage, events, fresh-produce and holiday-season pressures, where the actual cargo and handling needs are confirmed."],
  ["Autumn and harvest", "Agricultural movements, retail replenishment, heating products and early Christmas preparation."],
  ["Black Friday to Christmas", "Retail stock, packaging, gifts, food and drink, shutdown dates and delivery cut-offs."],
  ["Post-Christmas", "January returns, reverse movements, delayed collections and reopening schedules."],
];

export default function PeakPeriodHaulageCapacityPage() {
  return (
    <main id="main-content" className="bg-zinc-950 text-zinc-100">
      <SeoHead title={title} description={description} path="/peak-period-haulage-capacity/" />
      <section className="border-b border-zinc-800 bg-black py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">Dated capacity, clear limits</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">Plan peak-period haulage capacity without pretending availability is live</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">Owner-drivers and hauliers can share genuine vehicle location and dates for review. Businesses can prepare a specific transport requirement and contact the team. Neither action creates a public listing, match, rate or booking.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/#place-truck" className="rounded-full bg-amber-400 px-6 py-3.5 font-bold text-zinc-950 hover:bg-amber-300">Share dated capacity</Link>
            <OdeContactLink action="email" subject="Peak-period transport capacity enquiry" ariaLabel="Email Owner Driver Exchange about a peak-period transport requirement" className="rounded-full border border-zinc-600 px-6 py-3.5 font-semibold text-white hover:border-amber-300">Email a transport requirement</OdeContactLink>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2">
        <article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7 sm:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">For owner-drivers and hauliers</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Make the capacity signal useful</h2>
          <ul className="mt-6 space-y-4 leading-7 text-zinc-400">
            <li><strong className="text-zinc-200">Location:</strong> share the current town, city or postcode area rather than a broad claim of nationwide coverage.</li>
            <li><strong className="text-zinc-200">Dates:</strong> provide the real available-from date and an end date where known.</li>
            <li><strong className="text-zinc-200">Vehicle context:</strong> add relevant vehicle or direction notes without implying suitability before review.</li>
            <li><strong className="text-zinc-200">Updates:</strong> submit current information again if the vehicle, location or availability changes.</li>
          </ul>
        </article>
        <article className="rounded-3xl border border-zinc-800 bg-black p-7 sm:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">For businesses seeking capacity</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Prepare a requirement the team can review</h2>
          <ul className="mt-6 space-y-4 leading-7 text-zinc-400">
            <li>Collection and delivery locations, site access and booking rules</li>
            <li>Collection readiness, delivery deadline and any flexibility</li>
            <li>Freight description, dimensions, weight and handling constraints</li>
            <li>Closure dates, bank holidays and a named operational contact</li>
          </ul>
          <p className="mt-6 text-sm leading-6 text-zinc-500">Use direct phone or email contact for a transport requirement. No public vehicle-search result or booking is implied.</p>
        </article>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900 py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">Recurring planning windows</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Use the season to ask better operational questions</h2>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {periods.map(([heading, detail]) => (
              <article key={heading} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="text-xl font-bold text-white">{heading}</h3>
                <p className="mt-3 leading-7 text-zinc-400">{detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-7 max-w-4xl text-sm leading-6 text-zinc-500">These prompts do not state that Owner Driver Exchange currently has work, capacity or support for every listed product or movement. The actual requirement and operator suitability must be reviewed.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <article>
            <h2 className="text-3xl font-bold text-white">Christmas 2026: confirm the dates that affect each site</h2>
            <p className="mt-4 leading-7 text-zinc-400">Christmas Day is Friday 25 December 2026 and the Boxing Day substitute bank holiday is Monday 28 December in England and Wales. Scotland has its own official calendar. Site closures and booking cut-offs still need direct confirmation.</p>
            <a href="https://www.gov.uk/bank-holidays" className="mt-4 inline-flex font-bold text-amber-300 underline underline-offset-4">Check official UK bank-holiday dates</a>
          </article>
          <aside className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-7">
            <h2 className="text-xl font-bold text-white">What a successful form response means</h2>
            <p className="mt-4 leading-7 text-zinc-300">The backend accepted the details for review. It does not mean that a load, booking, rate, account, membership or partnership has been created.</p>
          </aside>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-black py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 sm:px-8 md:flex-row md:items-center">
          <div><h2 className="text-2xl font-bold text-white">Choose the supported next step</h2><p className="mt-2 text-zinc-400">Share capacity, make a partner enquiry or contact the team with a dated requirement.</p></div>
          <div className="flex flex-wrap gap-3"><Link href="/#place-truck" className="rounded-full bg-amber-400 px-6 py-3 font-bold text-zinc-950">Share capacity</Link><Link href="/#partner" className="rounded-full border border-zinc-600 px-6 py-3 font-semibold text-white">Partner enquiry</Link></div>
        </div>
      </section>
    </main>
  );
}
