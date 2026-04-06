"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface PlaceTruckFormProps {
  region?: string;
  className?: string;
}

export function PlaceTruckForm({
  region = "the UK",
  className,
}: PlaceTruckFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState("");
  const [showExtra, setShowExtra] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullname: formData.get("fullname")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phoneNumber")?.toString() || "",
      location: formData.get("location")?.toString() || "",
      availableFrom: formData.get("availableFrom")?.toString() || "",
      availableUntil: formData.get("availableUntil")?.toString() || "",
      companyname: formData.get("companyname")?.toString() || "",
      message: formData.get("message")?.toString() || "",
      optOutEmails: formData.get("optOut") === "on",
      region,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/place-truck`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) throw new Error("Submission failed");

      setSubmittedName(data.fullname);
      setSuccess(true);
      e.currentTarget.reset();
      setShowExtra(false);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className={cn(
          "w-full max-w-lg overflow-auto rounded-2xl bg-zinc-800 p-6 sm:max-w-xl md:p-8",
          className
        )}
        style={{ maxHeight: "100vh" }}
      >
        <h2 className="font-barlow-condensed text-2xl font-bold text-zinc-50 sm:text-3xl md:text-4xl">
          Post your truck availability in {region}
        </h2>

        <form className="my-6 space-y-4" onSubmit={handleSubmit}>
          <input type="hidden" name="region" value={region} />

          {/* Row 1: Name + Email */}
          <div className="flex flex-col gap-4 md:flex-row">
            <LabelInputContainer className="flex-1">
              <Label htmlFor="fullname" className="text-zinc-300">
                Full name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                placeholder="John Smith"
                required
                className="bg-zinc-700 text-zinc-50 placeholder:text-zinc-400 focus:ring-zinc-400"
              />
            </LabelInputContainer>

            <LabelInputContainer className="flex-1">
              <Label htmlFor="email" className="text-zinc-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="bg-zinc-700 text-zinc-50 placeholder:text-zinc-400 focus:ring-zinc-400"
              />
            </LabelInputContainer>
          </div>

          {/* Row 2: Phone + Location */}
          <div className="flex flex-col gap-4 md:flex-row">
            <LabelInputContainer className="flex-1">
              <Label htmlFor="phoneNumber" className="text-zinc-300">
                Phone number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+447123456789"
                required
                className="bg-zinc-700 text-zinc-50 placeholder:text-zinc-400 focus:ring-zinc-400"
              />
            </LabelInputContainer>

            <LabelInputContainer className="flex-1">
              <Label htmlFor="location" className="text-zinc-300">
                Truck location
              </Label>
              <Input
                id="location"
                name="location"
                placeholder={`Location in ${region}`}
                required
                className="bg-zinc-700 text-zinc-50 placeholder:text-zinc-400 focus:ring-zinc-400"
              />
            </LabelInputContainer>
          </div>

          {/* Row 3: Dates */}
          <div className="flex flex-row gap-4">
            <LabelInputContainer className="flex-1">
              <Label htmlFor="availableFrom" className="text-zinc-300">
                Available from
              </Label>
              <Input
                id="availableFrom"
                name="availableFrom"
                type="date"
                required
                className="bg-zinc-700 text-zinc-50 placeholder:text-zinc-400 focus:ring-zinc-400"
              />
            </LabelInputContainer>

            <LabelInputContainer className="flex-1">
              <Label htmlFor="availableUntil" className="text-zinc-300">
                Available until
              </Label>
              <Input
                id="availableUntil"
                name="availableUntil"
                type="date"
                className="bg-zinc-700 text-zinc-50 placeholder:text-zinc-400 focus:ring-zinc-400"
              />
            </LabelInputContainer>
          </div>

          {/* Optional Extra Details */}
          <button
            type="button"
            onClick={() => setShowExtra(!showExtra)}
            className="mt-2 text-sm text-zinc-400 underline hover:text-zinc-100"
          >
            {showExtra ? "Hide extra details" : "Add extra details (optional)"}
          </button>

          {showExtra && (
            <div className="mt-4 space-y-4">
              <LabelInputContainer>
                <Label htmlFor="companyname" className="text-zinc-300">
                  Company name
                </Label>
                <Input
                  id="companyname"
                  name="companyname"
                  placeholder="Optional"
                  className="bg-zinc-700 text-zinc-50 placeholder:text-zinc-400 focus:ring-zinc-400"
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="message" className="text-zinc-300">
                  Additional info
                </Label>
                <Input
                  id="message"
                  name="message"
                  placeholder={`Any extra details...`}
                  className="bg-zinc-700 text-zinc-50 placeholder:text-zinc-400 focus:ring-zinc-400"
                />
              </LabelInputContainer>

              <LabelInputContainer className="flex-row items-center gap-2">
                <Input id="optOut" name="optOut" type="checkbox" />
                <Label htmlFor="optOut" className="text-zinc-300">
                  Opt-out of marketing emails
                </Label>
              </LabelInputContainer>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-md bg-zinc-600 py-3 text-white hover:bg-zinc-500"
          >
            {loading ? "Submitting..." : "Post your availability"}
          </button>

          {success && (
            <p className="mt-2 text-center text-green-400">
              Thank you {submittedName}, your availability has been posted
              successfully!
            </p>
          )}
          {error && <p className="mt-2 text-center text-red-400">{error}</p>}
        </form>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);