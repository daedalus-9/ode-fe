"use client";

import { OdeContactLink } from "@/components/contact/OdeContactLink";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

interface PartnerJoinFormProps { region?: string; className?: string }
type Status = { kind: "idle" | "submitting" | "success" | "error"; message: string };
const REQUEST_TIMEOUT_MS = 12_000;

export function PartnerJoinForm({ region = "Great Britain", className = "" }: PartnerJoinFormProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });
  const statusRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);
  const submissionIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (status.kind === "success" || status.kind === "error") statusRef.current?.focus();
  }, [status.kind]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const apiBase = process.env.NEXT_PUBLIC_API_URL?.trim() || (process.env.NODE_ENV === "development" ? "http://localhost:3001" : "");
    if (!apiBase) {
      setStatus({ kind: "error", message: "We could not send your details online. Please call or email us and try again after the site configuration has been checked." });
      return;
    }

    const marketingConsent = fields.get("marketingConsent") === "on";
    submittingRef.current = true;
    submissionIdRef.current ||= window.crypto.randomUUID();
    setStatus({ kind: "submitting", message: "Sending your details…" });
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(`${apiBase.replace(/\/$/, "")}/partner-join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: submissionIdRef.current,
          sourceSite: "Owner Driver Exchange",
          sourceUrl: window.location.href,
          fullname: fields.get("fullname")?.toString() || "",
          email: fields.get("email")?.toString() || "",
          phoneNumber: fields.get("phoneNumber")?.toString() || "",
          marketingConsent,
          optOut: !marketingConsent,
          region,
          website: fields.get("website")?.toString() || "",
        }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Partner endpoint returned ${response.status}`);
      form.reset();
      submissionIdRef.current = null;
      setStatus({ kind: "success", message: "Your contact details have been received for review. This does not guarantee work, rates or partner acceptance." });
    } catch (error) {
      console.error(error);
      setStatus({ kind: "error", message: "We could not confirm that your details were received. Please try again, call us or email us." });
    } finally {
      window.clearTimeout(timeout);
      submittingRef.current = false;
    }
  }

  const inputClass = "rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 disabled:opacity-60";
  const disabled = status.kind === "submitting";
  return (
    <form onSubmit={handleSubmit} className={`rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8 ${className}`} aria-labelledby="partner-form-heading" aria-busy={disabled}>
      <h2 id="partner-form-heading" className="text-2xl font-bold text-white sm:text-3xl">Start a partner enquiry</h2>
      <p className="mt-3 leading-7 text-zinc-400">Share contact details for an initial review. No work, onboarding or commercial terms are promised by submitting this form.</p>
      <fieldset disabled={disabled} className="mt-7 grid gap-5">
        <label className="grid gap-2 text-sm font-semibold text-zinc-200">Full name<input className={inputClass} name="fullname" required minLength={2} maxLength={100} autoComplete="name" /></label>
        <label className="grid gap-2 text-sm font-semibold text-zinc-200">Email address<input className={inputClass} name="email" type="email" required maxLength={160} autoComplete="email" /></label>
        <label className="grid gap-2 text-sm font-semibold text-zinc-200">Phone number<input className={inputClass} name="phoneNumber" type="tel" required maxLength={30} autoComplete="tel" /></label>
        <label className="flex items-start gap-3 text-sm leading-6 text-zinc-400"><input className="mt-1 h-5 w-5 rounded border-zinc-600" name="marketingConsent" type="checkbox" /><span>I would like to receive occasional partner-related updates. This is optional and does not affect this enquiry.</span></label>
      </fieldset>
      <div className="absolute left-[-9999px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="mt-5 text-sm leading-6 text-zinc-400">Owner Driver Exchange uses these details to review and respond to the enquiry. Read the <Link href="/privacy-policy/" className="font-bold text-amber-300 underline underline-offset-4">privacy notice</Link>.</p>
      <button disabled={disabled} type="submit" className="mt-7 w-full rounded-full border border-amber-400 px-6 py-3.5 font-bold text-amber-300 hover:bg-amber-400 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400 disabled:cursor-wait disabled:opacity-70">{disabled ? "Sending…" : "Send partner enquiry"}</button>
      {status.kind !== "idle" && <div ref={statusRef} tabIndex={-1} role={status.kind === "error" ? "alert" : "status"} aria-live={status.kind === "error" ? "assertive" : "polite"} className={`mt-5 rounded-xl p-4 text-sm leading-6 outline-none focus:ring-2 focus:ring-amber-400 ${status.kind === "success" ? "bg-emerald-950 text-emerald-200" : disabled ? "bg-zinc-800 text-zinc-200" : "bg-amber-950 text-amber-200"}`}><p>{status.message}</p>{status.kind === "error" && <div className="mt-3 flex gap-4"><OdeContactLink action="call" className="font-bold underline">Call us</OdeContactLink><OdeContactLink action="email" subject="Partner enquiry" className="font-bold underline">Email us</OdeContactLink></div>}</div>}
    </form>
  );
}
