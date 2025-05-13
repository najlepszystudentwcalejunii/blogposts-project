import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "raw.githubusercontent.com",
            port: "",
            pathname: "/najlepszystudentwcalejunii/blogposts/main/images/**",
         },
      ],
   },
};

export default nextConfig;
