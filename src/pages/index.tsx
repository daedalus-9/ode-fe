import { CountryLinksSection } from "@/components/countryLinksSection/CountryLinksSection";
import { CTA } from "@/components/cta/CTA";
import { Customers } from "@/components/customers/Customers";
import Carousel from "@/components/features/carousel/Carousel";
import { CodeDemo } from "@/components/features/code/CodeDemo";
import { FeatureGrid } from "@/components/features/grid/FeatureGrid";
import { Stats } from "@/components/features/stats/Stats";
import { FiftyFiftyCard } from "@/components/fiftyFiftyCard/fiftyFiftyCard";
import Footer from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";
import { PlaceTruckForm } from "@/components/placeTruckForm/PlaceTruckForm";
import { TrustedAcrossUK } from "@/components/trustedAcrossUK/TrustedAcrossUK";
import { Barlow } from "next/font/google";
import Head from "next/head";

const barlowFont = Barlow({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  const title =
    "Owner Driver Exchange | HGV & Owner Driver Loads Across the UK";
  const description =
    "Owner Driver Exchange connects UK owner drivers and small fleets with steady, ongoing haulage work. Post your truck availability, reduce empty miles, and get matched with businesses that need reliable transport across the UK.";

  const keywords = [
    "owner driver UK",
    "owner driver loads",
    "haulage work UK",
    "HGV work",
    "loads for owner drivers",
    "reduce empty miles",
    "owner driver jobs",
    "HGV owner driver",
    "UK haulage",
    "transport work UK",
    "owner driver exchange",
    "find haulage work UK",
    "ongoing haulage work",
    "truck availability UK",
    "backloads UK",
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Owner Driver Exchange",
    url: "https://www.ownerdriver.exchange",
    description:
      "Owner Driver Exchange connects UK owner drivers and small fleets with businesses that need regular, reliable transport. Post your truck availability and get matched with ongoing haulage work across the UK.",
    email: "traffic@logic-freight.co.uk",
    telephone: "+44 1633 441457",
    logo: "https://www.ownerdriver.exchange/assets/images/logo.png",
    image: "https://www.ownerdriver.exchange/assets/images/truck_bg.webp",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.ownerdriver.exchange",
      },
    ],
  };

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Owner Driver Load Matching",
    provider: {
      "@type": "Organization",
      name: "Owner Driver Exchange",
    },
    description:
      "A UK platform that matches owner drivers and small haulage fleets with businesses seeking regular, reliable transport. Post your truck availability to find ongoing HGV work and reduce empty miles.",
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    serviceType: "Haulage Load Matching",
  };

  return (
    <main className={barlowFont.className}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(", ")} />
        <link rel="canonical" href="https://www.ownerdriver.exchange" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://www.ownerdriver.exchange" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Owner Driver Exchange" />
        <meta
          property="og:image"
          content="https://www.ownerdriver.exchange/assets/images/truck_bg.webp"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://www.ownerdriver.exchange/assets/images/truck_bg.webp"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
        />
      </Head>

      <Hero />
      {/* <PlaceTruckForm /> */}
      <TrustedAcrossUK />
      <CountryLinksSection />
      <FeatureGrid />
      <CodeDemo />
      <Carousel />
      {/* <Customers /> */}
      {/* <Stats /> */}
      <FiftyFiftyCard />
      <CTA />
    </main>
  );
}
