import Footer from "@/components/footer/Footer";
import FlyoutNav from "@/components/navbar/NavBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Default meta tags */}
        <title>Owner Driver Exchange | Find HGV Work Across the UK</title>
        <meta
          name="description"
          content="Owner Driver Exchange helps owner drivers and small fleets find reliable HGV work across the UK. Reduce empty miles, get matched with businesses, and plan smarter journeys."
        />
        <meta
          name="keywords"
          content="owner driver exchange, HGV work UK, haulage jobs, owner driver loads, reduce empty miles"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Owner Driver Exchange | Secure HGV Work Across the UK"
        />
        <meta
          property="og:description"
          content="Find regular haulage work, share your truck availability, and reduce empty miles with Owner Driver Exchange."
        />
        <meta property="og:image" content="/assets/images/truck_bg.webp" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.ownerdriverexchange.co.uk"
        />
      </Head>

      <FlyoutNav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
