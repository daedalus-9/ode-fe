import { OdeContactLink } from "@/components/contact/OdeContactLink";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black text-zinc-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-3">
        <div><p className="font-semibold text-white">Owner Driver Exchange</p><p className="mt-3 text-sm leading-6 text-zinc-400">An enquiry route for transport providers sharing genuine vehicle capacity and businesses seeking transport support. Availability and commercial terms are confirmed case by case.</p></div>
        <nav aria-label="Footer navigation" className="text-sm leading-7"><p className="font-semibold text-white">Explore</p><Link className="mt-2 block hover:text-amber-300" href="/how-it-works/">How it works</Link><Link className="block hover:text-amber-300" href="/great-britain-haulage-coverage/">England, Scotland and Wales coverage</Link><Link className="block hover:text-amber-300" href="/haulage-routes/">City-to-city routes</Link><Link className="block hover:text-amber-300" href="/haulage-postcodes/">Postcode areas</Link><Link className="block hover:text-amber-300" href="/peak-period-haulage-capacity/">Peak-period capacity planning</Link><Link className="block hover:text-amber-300" href="/#place-truck">Share vehicle capacity</Link><Link className="block hover:text-amber-300" href="/#partner">Partner enquiry</Link><Link className="block hover:text-amber-300" href="/privacy-policy/">Privacy notice</Link></nav>
        <address className="not-italic text-sm leading-7"><p className="font-semibold text-white">Contact</p><OdeContactLink action="call" className="mt-2 block underline decoration-zinc-700 underline-offset-4 hover:text-white">Call us</OdeContactLink><OdeContactLink action="email" subject="Website enquiry" className="block underline decoration-zinc-700 underline-offset-4 hover:text-white">Email us</OdeContactLink></address>
      </div>
      <div className="border-t border-zinc-900 px-5 py-5 text-center text-xs text-zinc-600">© {new Date().getFullYear()} Owner Driver Exchange. Enquiries are reviewed; work and availability are not guaranteed.</div>
    </footer>
  );
}
