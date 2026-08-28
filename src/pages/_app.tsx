import Footer from "@/components/footer/Footer";
import FlyoutNav from "@/components/navbar/NavBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <a href="#main-content" className="sr-only z-[100] rounded bg-white px-4 py-2 text-zinc-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to main content</a>
      <FlyoutNav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
