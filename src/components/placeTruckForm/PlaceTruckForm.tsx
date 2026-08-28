"use client";

import { OdeContactLink } from "@/components/contact/OdeContactLink";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

interface PlaceTruckFormProps { region?: string; className?: string }
type Status = { kind: "idle" | "submitting" | "success" | "error"; message: string };
const REQUEST_TIMEOUT_MS = 12_000;

export function PlaceTruckForm({ region = "Great Britain", className = "" }: PlaceTruckFormProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });
  const [showExtra, setShowExtra] = useState(false);
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
    const availableFrom = fields.get("availableFrom")?.toString() || "";
    const availableUntil = fields.get("availableUntil")?.toString() || "";
    if (availableUntil && availableUntil < availableFrom) {
      setStatus({ kind: "error", message: "The available-until date must be on or after the available-from date." });
      return;
    }
    const apiBase = process.env.NEXT_PUBLIC_API_URL?.trim() || (process.env.NODE_ENV === "development" ? "http://localhost:3001" : "");
    if (!apiBase) {
      setStatus({ kind: "error", message: "We could not send your capacity details online. Please call or email us and try again after the site configuration has been checked." });
      return;
    }

    const marketingConsent = fields.get("marketingConsent") === "on";
    const data = {
      submissionId: (submissionIdRef.current ||= window.crypto.randomUUID()),
      sourceSite: "Owner Driver Exchange",
      sourceUrl: window.location.href,
      fullname: fields.get("fullname")?.toString() || "",
      email: fields.get("email")?.toString() || "",
      phone: fields.get("phoneNumber")?.toString() || "",
      location: fields.get("location")?.toString() || "",
      availableFrom,
      availableUntil,
      companyname: fields.get("companyname")?.toString() || "",
      message: fields.get("message")?.toString() || "",
      marketingConsent,
      optOutEmails: !marketingConsent,
      region,
      website: fields.get("website")?.toString() || "",
    };

    submittingRef.current = true;
    setStatus({ kind: "submitting", message: "Sending your capacity details…" });
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(`${apiBase.replace(/\/$/, "")}/place-truck`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Place-truck endpoint returned ${response.status}`);
      form.reset();
      submissionIdRef.current = null;
      setShowExtra(false);
      setStatus({ kind: "success", message: "Your vehicle details have been received for review. This does not confirm a load, rate or booking." });
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
    <form onSubmit={handleSubmit} className={`rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/20 sm:p-8 ${className}`} aria-labelledby="capacity-form-heading" aria-busy={disabled}>
      <h2 id="capacity-form-heading" className="text-2xl font-bold text-white sm:text-3xl">Share vehicle capacity in {region}</h2>
      <p className="mt-3 leading-7 text-zinc-400">Provide current, genuine availability for review. The form does not publish a live listing or guarantee matching work.</p>
      <fieldset disabled={disabled} className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-zinc-200">Full name<input className={inputClass} name="fullname" required minLength={2} maxLength={100} autoComplete="name" /></label>
        <label className="grid gap-2 text-sm font-semibold text-zinc-200">Email address<input className={inputClass} name="email" type="email" required maxLength={160} autoComplete="email" /></label>
        <label className="grid gap-2 text-sm font-semibold text-zinc-200">Phone number <span className="font-normal text-zinc-500">Optional</span><input className={inputClass} name="phoneNumber" type="tel" maxLength={30} autoComplete="tel" /></label>
        <label className="grid gap-2 text-sm font-semibold text-zinc-200">Current vehicle location<input className={inputClass} name="location" required maxLength={120} autoComplete="address-level2" placeholder="Town, city or postcode area" /></label>
        <label className="grid gap-2 text-sm font-semibold text-zinc-200">Available from<input className={inputClass} name="availableFrom" type="date" required /></label>
        <label className="grid gap-2 text-sm font-semibold text-zinc-200">Available until <span className="font-normal text-zinc-500">Optional</span><input className={inputClass} name="availableUntil" type="date" /></label>
      </fieldset>
      <button type="button" disabled={disabled} onClick={() => setShowExtra((value) => !value)} aria-expanded={showExtra} aria-controls="capacity-optional-fields" className="mt-6 rounded-sm text-sm font-semibold text-amber-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400 disabled:opacity-60">{showExtra ? "Hide optional details" : "Add company and vehicle details"}</button>
      {showExtra && <fieldset id="capacity-optional-fields" disabled={disabled} className="mt-5 grid gap-5"><label className="grid gap-2 text-sm font-semibold text-zinc-200">Company name <span className="font-normal text-zinc-500">Optional</span><input className={inputClass} name="companyname" maxLength={120} autoComplete="organization" /></label><label className="grid gap-2 text-sm font-semibold text-zinc-200">Vehicle or capacity notes <span className="font-normal text-zinc-500">Optional</span><textarea className={`${inputClass} min-h-28`} name="message" maxLength={1000} placeholder="Vehicle type, direction of travel or relevant constraints" /></label><label className="flex items-start gap-3 text-sm leading-6 text-zinc-400"><input className="mt-1 h-5 w-5 rounded border-zinc-600" name="marketingConsent" type="checkbox" /><span>I would like to receive occasional relevant updates. This is optional and does not affect this capacity enquiry.</span></label></fieldset>}
      <div className="absolute left-[-9999px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="mt-5 text-sm leading-6 text-zinc-400">Owner Driver Exchange uses these details to review and respond to the enquiry. Read the <Link href="/privacy-policy/" className="font-bold text-amber-300 underline underline-offset-4">privacy notice</Link>.</p>
      <button disabled={disabled} type="submit" className="mt-7 w-full rounded-full bg-amber-400 px-6 py-3.5 font-bold text-zinc-950 hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400 disabled:cursor-wait disabled:opacity-70">{disabled ? "Sending…" : "Send capacity for review"}</button>
      {status.kind !== "idle" && <div ref={statusRef} tabIndex={-1} role={status.kind === "error" ? "alert" : "status"} aria-live={status.kind === "error" ? "assertive" : "polite"} className={`mt-5 rounded-xl p-4 text-sm leading-6 outline-none focus:ring-2 focus:ring-amber-400 ${status.kind === "success" ? "bg-emerald-950 text-emerald-200" : disabled ? "bg-zinc-800 text-zinc-200" : "bg-amber-950 text-amber-200"}`}><p>{status.message}</p>{status.kind === "error" && <div className="mt-3 flex gap-4"><OdeContactLink action="call" className="font-bold underline">Call us</OdeContactLink><OdeContactLink action="email" subject="Vehicle capacity enquiry" className="font-bold underline">Email us</OdeContactLink></div>}</div>}
    </form>
  );
}
