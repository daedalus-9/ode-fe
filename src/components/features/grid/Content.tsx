import { BubbleButton } from "@/components/buttons/BubbleButton";
import { MaxWidthWrapper } from "@/components/utils/MaxWidthWrapper";
import { scrollToForm } from "@/components/utils/scrollToForm";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { SectionHeadingSpacing } from "@/components/utils/SectionHeadingSpacing";
import { SectionSubheading } from "@/components/utils/SectionSubheading";
import React from "react";
import { LongCard } from "./LongCard";
import { MiniCard1 } from "./MiniCard1";
import { MiniCard2 } from "./MiniCard2";
import { SimpleGrid } from "./SimpleGrid";
import { Tower } from "./Tower";

export const Content = () => {
  return (
    <section className="relative bg-gradient-to-b from-zinc-950 to-zinc-900">
      <MaxWidthWrapper className="relative z-20 pb-20 pt-20 md:pb-28 md:pt-40">
        <SectionHeadingSpacing>
            <SectionHeading>
            Owner Driver Work Made Simple
              <br />
              <span className="bg-gradient-to-br from-amber-400 to-amber-700 bg-clip-text text-transparent">
                find return loads, backloads and available loads near you
              </span>
            </SectionHeading>

            <SectionSubheading>
            A smarter way to get matched with{" "}
            <strong>ongoing owner driver loads</strong> across the UK. Reduce
            empty miles, boost earnings, and connect with businesses that need
            regular transport in England, Scotland, Wales, and Northern Ireland.
            </SectionSubheading>
        </SectionHeadingSpacing>

        <Grid />

        {/* Divider */}
        <div className="my-12 h-[1px] w-full bg-gradient-to-r from-amber-800/0 via-amber-400/50 to-amber-800/0 md:my-20" />

        <SimpleGrid />

        <div className="mt-16 flex justify-center">
          <BubbleButton onClick={() => scrollToForm()}>
            Join the Owner Driver Exchange Network
          </BubbleButton>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

const Grid = () => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
    <Tower />
    <div className="col-span-1 grid grid-cols-2 gap-6 lg:col-span-8 lg:grid-cols-2">
      <MiniCard1 />
      <MiniCard2 />
      <LongCard />
    </div>
  </div>
);
