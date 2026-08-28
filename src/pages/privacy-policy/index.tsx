import { OdeContactLink } from "@/components/contact/OdeContactLink";
import { SeoHead } from "@/components/seo/SeoHead";

const title = "Privacy Notice | Owner Driver Exchange";
const description = "How Owner Driver Exchange handles contact, vehicle-capacity and partner enquiry information submitted through this website.";

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="bg-zinc-950 py-16 text-zinc-100 sm:py-24">
      <SeoHead title={title} description={description} path="/privacy-policy/" noindex />
      <article className="mx-auto max-w-4xl px-5 sm:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">Privacy notice</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">How enquiry information is handled</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-400">Owner Driver Exchange receives the information submitted through this website so capacity, transport and partner enquiries can be reviewed and answered.</p>
        <div className="mt-10 grid gap-6">
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7"><h2 className="text-2xl font-bold text-white">Information collected</h2><p className="mt-3 leading-7 text-zinc-300">Forms collect contact details and, depending on the journey, vehicle location, availability dates, optional capacity notes, communication preference, source website, page URL and a backend-generated submission time.</p></section>
          <section className="rounded-3xl border border-zinc-800 bg-black p-7"><h2 className="text-2xl font-bold text-white">How it is used</h2><p className="mt-3 leading-7 text-zinc-300">The receiving system validates and stores the submission, sends a receipt and an internal notification, and enables the team to respond. Optional updates are sent only when the separate marketing checkbox is selected.</p></section>
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7"><h2 className="text-2xl font-bold text-white">Storage and service providers</h2><p className="mt-3 leading-7 text-zinc-300">Submissions are stored in the configured database and sent through the configured email service. Access and retention should be limited to what is needed for enquiry handling, legal obligations and security. Production owners must keep provider access and retention rules under review.</p></section>
          <section className="rounded-3xl border border-zinc-800 bg-black p-7"><h2 className="text-2xl font-bold text-white">Questions about your information</h2><p className="mt-3 leading-7 text-zinc-300">Ask about access, correction or deletion by using the actions below. Whether information can be deleted depends on any legal obligation to retain it.</p><div className="mt-5 flex flex-wrap gap-3"><OdeContactLink action="email" subject="Privacy request" ariaLabel="Email Owner Driver Exchange about a privacy request" className="rounded-full bg-amber-400 px-5 py-3 font-bold text-zinc-950">Email us</OdeContactLink><OdeContactLink action="call" className="rounded-full border border-zinc-600 px-5 py-3 font-bold text-white">Call us</OdeContactLink></div></section>
        </div>
      </article>
    </main>
  );
}
