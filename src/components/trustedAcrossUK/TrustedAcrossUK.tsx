"use client";

import { motion } from "framer-motion";

export const TrustedAcrossUK = () => {
  return (
    <section
      className="relative mx-auto max-w-7xl overflow-hidden border-t border-zinc-800 py-10"
      aria-labelledby="trusted-uk-haulage"
    >
      {/* Heading */}
      <motion.span
        id="trusted-uk-haulage"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="mx-auto mb-10 block w-fit bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text text-center text-lg font-medium text-transparent"
      >
        Trusted by owner drivers and hauliers across the UK
      </motion.span>

      {/* Continuous scrolling regions */}
      <div className="relative flex overflow-hidden">
        <TranslateWrapper>
          <RegionItems />
        </TranslateWrapper>
        <TranslateWrapper>
          <RegionItems />
        </TranslateWrapper>

        {/* gradient fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-zinc-950 to-transparent" />
      </div>

      {/* Supporting paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="mx-auto mt-8 max-w-3xl text-center text-base text-zinc-400 md:text-lg"
      >
        Owner Driver Exchange connects UK-based owner drivers and small fleets
        with <strong>ongoing haulage work</strong>. Share your truck
        availability to reduce empty miles, boost earnings, and secure reliable
        routes across England, Scotland, Wales, and Northern Ireland.
      </motion.p>
    </section>
  );
};

// === Continuous scrolling wrapper ===
const TranslateWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="flex shrink-0 items-center justify-around gap-10 px-10"
    animate={{ x: ["0%", "-100%"] }}
    transition={{
      repeat: Infinity,
      ease: "linear",
      duration: 30,
    }}
  >
    {children}
  </motion.div>
);

// === List of regions ===
const RegionItems = () => (
  <>
    <Region name="North West" />
    <Region name="London" />
    <Region name="Scotland" />
    <Region name="North East" />
    <Region name="South Wales" />
    <Region name="Midlands" />
    <Region name="South West" />
    <Region name="Northern Ireland" />
  </>
);

// === Single region item ===
const Region = ({ name }: { name: string }) => (
  <div className="flex items-center gap-2 whitespace-nowrap text-lg font-medium text-zinc-300">
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="text-zinc-500"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    </svg>
    {name}
  </div>
);
