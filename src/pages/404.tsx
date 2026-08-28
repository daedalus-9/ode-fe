import { SeoHead } from "@/components/seo/SeoHead";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main id="main-content" className="flex min-h-[65vh] items-center bg-zinc-950 px-5 py-20 text-zinc-100">
      <SeoHead title="Page not found | Owner Driver Exchange" description="The requested Owner Driver Exchange page could not be found." path="/404/" noindex />
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-400">The address may be incorrect or the page may have moved. Continue from a working enquiry route.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/" className="rounded-full border border-zinc-600 px-6 py-3 font-bold text-white hover:border-amber-300">Go to the homepage</Link><Link href="/#place-truck" className="rounded-full bg-amber-400 px-6 py-3 font-bold text-zinc-950 hover:bg-amber-300">Share vehicle capacity</Link></div>
      </div>
    </main>
  );
}
