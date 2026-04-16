import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Allow dev assets when using tunnels (localtunnel, ngrok, etc.) */
  allowedDevOrigins: ["*.loca.lt", "*.ngrok-free.app", "*.ngrok.io", "*.trycloudflare.com"],

  /** When both www and apex point at this app, send www → canonical apex. */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.fighurai.com" }],
        destination: "https://fighurai.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
