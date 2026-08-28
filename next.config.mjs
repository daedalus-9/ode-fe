import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  compress: true,
  turbopack: { root: appRoot },

  async redirects() {
    const regions = ["england", "scotland", "wales"];
    return [{ source: "/signin/", destination: "/#place-truck", permanent: true }, ...regions.flatMap((region) => ["Content", "GradientGrid"].map((component) => ({
      source: `/return-loads-${region}/hero/${component}/`,
      destination: `/return-loads-${region}/`,
      permanent: true,
    })))];
  },

  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
};

export default nextConfig;
