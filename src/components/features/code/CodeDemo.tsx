"use client";

import { SplashButton } from "@/components/buttons/SplashButton";
import { MaxWidthWrapper } from "@/components/utils/MaxWidthWrapper";
import { scrollToForm } from "@/components/utils/scrollToForm";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { SectionHeadingSpacing } from "@/components/utils/SectionHeadingSpacing";
import { SectionSubheading } from "@/components/utils/SectionSubheading";
import React from "react";
import { FiArrowRight, FiTruck } from "react-icons/fi";
import { Minigrid } from "../../utils/Minigrid";
import { CodeCard } from "./CodeCard";
import { Stepper } from "./Stepper";

export const CodeDemo = () => {
  return (
    <section className="relative overflow-hidden border-y border-zinc-700 bg-zinc-950">
      <MaxWidthWrapper className="relative z-20 py-20 md:py-36">
        {/* Icon highlight */}
        <span
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-600/20 to-yellow-900/20 text-3xl shadow-md shadow-amber-900"
          aria-label="Truck carrying loads"
        >
          <FiTruck />
        </span>

        {/* Heading & subheading */}
        <SectionHeadingSpacing>
          <SectionHeading persistCenter>
            Keep your trucks moving with verified return loads UK
          </SectionHeading>
          <SectionSubheading persistCenter>
            Owner Driver Exchange connects hauliers with real return loads
            across the UK helping you reduce empty miles, save fuel, and
            maximise efficiency on every route.
          </SectionSubheading>
        </SectionHeadingSpacing>

        {/* Demo components */}
        <div className="mt-12 flex flex-col gap-12 md:mt-16">
          <CodeCard />
          <Stepper />
        </div>

        {/* CTA button */}
        <SplashButton
          onClick={() => scrollToForm()}
          className="mx-auto mt-12 flex items-center gap-2"
        >
          Get started
          <FiArrowRight />
        </SplashButton>
      </MaxWidthWrapper>

      {/* Background visual */}
      <Minigrid />
    </section>
  );
};
