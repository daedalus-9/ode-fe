import { GhostButton } from "@/components/buttons/GhostButton";
import { MaxWidthWrapper } from "@/components/utils/MaxWidthWrapper";
import { scrollToForm } from "@/components/utils/scrollToForm";

export function RegionalHeroFooter({ region }: { region: string }) {
  return (
    <section className="relative border-t border-zinc-800 bg-zinc-900/20 py-24">
      <MaxWidthWrapper className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-2xl font-semibold text-zinc-50 sm:text-3xl">
          Discuss capacity in {region}
        </h2>
        <p className="mb-10 text-zinc-400 sm:text-lg">
          Share your operating area, vehicle details and availability with Owner Driver Exchange. A submitted enquiry is not a guarantee of work, a load, a rate or a booking.
        </p>
        <GhostButton onClick={scrollToForm} className="rounded-md px-4 py-2 text-lg text-zinc-100">
          Share vehicle availability
        </GhostButton>
      </MaxWidthWrapper>
    </section>
  );
}
