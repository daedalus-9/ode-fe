import { GhostButton } from "@/components/buttons/GhostButton";
import { useRouter } from "next/router";

const countries = [
  { name: "Owner Driver Work in England", href: "/haulage-work-england" },
  { name: "Owner Driver Work in Scotland", href: "/haulage-work-scotland" },
  { name: "Owner Driver Work in Wales", href: "/haulage-work-wales" },
];

export const CountryLinksSection = () => {
  const router = useRouter();

  return (
    <section className="relative mx-auto max-w-4xl py-16 text-center">
      <h2 className="mb-6 text-2xl font-bold text-zinc-50 sm:text-3xl">
        Ongoing Haulage Work Across the UK
      </h2>
      <p className="mb-12 text-zinc-400">
        Quickly find owner driver jobs and reliable routes in England, Scotland,
        and Wales. Share your availability to reduce empty miles and secure
        consistent work.
      </p>

      {/* Country Buttons */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {countries.map((country) => (
          <GhostButton
            key={country.name}
            onClick={() => router.push(country.href)}
            className="rounded-md px-6 py-4 text-lg sm:text-xl"
          >
            {country.name}
          </GhostButton>
        ))}
      </div>
    </section>
  );
};
