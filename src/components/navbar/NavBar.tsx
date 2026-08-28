"use client";

import { OdeContactLink } from "@/components/contact/OdeContactLink";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  ["/how-it-works/", "How it works"],
  ["/great-britain-haulage-coverage/", "Coverage"],
  ["/haulage-routes/", "City routes"],
  ["/haulage-postcodes/", "Postcodes"],
  ["/peak-period-haulage-capacity/", "Peak capacity"],
  ["/#place-truck", "Share capacity"],
  ["/#partner", "Partner enquiry"],
] as const;

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 text-zinc-100 backdrop-blur">
      <nav aria-label="Primary navigation" className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Owner Driver Exchange home" className="flex items-center gap-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400">
            <Image src="/odx-logo.png" alt="" width={48} height={48} priority className="h-10 w-10 rounded-lg object-contain" />
            <span>Owner Driver Exchange</span>
          </Link>
          <button type="button" aria-expanded={open} aria-controls="ode-mobile-menu" onClick={() => setOpen((value) => !value)} className="inline-flex min-h-11 items-center rounded-lg border border-zinc-700 px-4 text-sm font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400 lg:hidden">{open ? "Close menu" : "Menu"}</button>
          <div className="hidden items-center gap-4 text-sm font-medium lg:flex">
            {links.map(([href, label]) => <Link key={href} href={href} className="rounded-sm hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400">{label}</Link>)}
            <OdeContactLink action="call" className="rounded-full bg-amber-400 px-4 py-2.5 font-bold text-zinc-950 hover:bg-amber-300">Call us</OdeContactLink>
          </div>
        </div>
        {open && <div id="ode-mobile-menu" className="grid gap-1 border-t border-zinc-800 pb-2 pt-3 text-sm font-medium lg:hidden">{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400">{label}</Link>)}<div className="mt-2 grid grid-cols-2 gap-3"><OdeContactLink action="call" className="rounded-full bg-amber-400 px-4 py-3 text-center font-bold text-zinc-950">Call us</OdeContactLink><OdeContactLink action="email" subject="Website enquiry" className="rounded-full border border-amber-400 px-4 py-3 text-center font-bold text-amber-300">Email us</OdeContactLink></div></div>}
      </nav>
    </header>
  );
}
