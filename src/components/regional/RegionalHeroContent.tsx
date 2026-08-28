import { GhostButton } from "@/components/buttons/GhostButton";
import { SplashButton } from "@/components/buttons/SplashButton";
import { GlowingChip } from "@/components/utils/GlowingChip";
import { MaxWidthWrapper } from "@/components/utils/MaxWidthWrapper";
import { scrollToForm } from "@/components/utils/scrollToForm";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export function RegionalHeroContent({ region }: { region: string }) {
  return (
    <section className="relative border-b border-zinc-800">
      <MaxWidthWrapper className="relative z-20 flex flex-col items-center justify-center pb-16 pt-28 text-center md:pb-36 md:pt-36">
        <motion.div initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.25, ease: "easeInOut" }}>
          <GlowingChip>Regional freight and capacity enquiries</GlowingChip>
        </motion.div>
        <motion.h1 initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.25, delay: 0.25, ease: "easeInOut" }} className="mb-4 max-w-3xl text-3xl font-bold leading-tight text-zinc-50 sm:text-4xl md:text-5xl lg:text-6xl">
          Return-load enquiries in {region}
        </motion.h1>
        <motion.p initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.25, delay: 0.5, ease: "easeInOut" }} className="mb-10 max-w-2xl text-base text-zinc-400 sm:text-lg md:text-xl">
          Tell Owner Driver Exchange where your vehicle is available and what type of work you can consider. Availability, suitability and commercial terms are reviewed case by case.
        </motion.p>
        <motion.div initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.25, delay: 0.75, ease: "easeInOut" }} className="flex flex-col items-center gap-4 sm:flex-row">
          <SplashButton as="a" href="tel:01633441457" className="mx-auto inline-flex items-center gap-2">
            Call about capacity <FiArrowRight />
          </SplashButton>
          <GhostButton onClick={scrollToForm} className="rounded-md px-4 py-2 text-lg text-zinc-100">
            Share vehicle availability
          </GhostButton>
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
}
