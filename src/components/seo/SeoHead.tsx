import { absoluteUrl, siteName } from "@/lib/seo";
import Head from "next/head";

export function SeoHead({ title, description, path, noindex = false, image = "/assets/images/truck_bg.webp" }: { title: string; description: string; path: string; noindex?: boolean; image?: string }) {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    isPartOf: { "@type": "WebSite", name: siteName, url: absoluteUrl("/") },
  };
  return (
    <Head>
      <title>{title}</title><meta name="description" content={description} /><meta name="robots" content={noindex ? "noindex, follow" : "index, follow"} /><link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:url" content={canonical} /><meta property="og:type" content="website" /><meta property="og:site_name" content={siteName} /><meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={imageUrl} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </Head>
  );
}
