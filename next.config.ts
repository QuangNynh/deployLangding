import type { NextConfig } from "next";
import { i18nConfig } from "./src/i18nConfig";

const generateRewrites = () => {
  const rules: { source: string; destination: string }[] = [];

  // Đảm bảo rằng '/' sẽ luôn là trang chủ tiếng Việt (vi)
  rules.push({
    source: '/',
    destination: '/vi',
  });

  // Đảm bảo rằng '/en' sẽ là trang chủ tiếng Anh (en)
  rules.push({
    source: '/en',
    destination: '/en',
  });

  // Viết lại các route cho các trang khác (không có prefix 'vi/', nhưng có 'en/')
  Object.entries(i18nConfig.localeRouteMap).forEach(([locale, routes]) => {
    Object.entries(routes).forEach(([key, value]) => {
      if (locale === "vi") {
        // Với tiếng Việt: Không có tiền tố "/vi/"
        rules.push({ source: `/${value}/:slug*`, destination: `/vi/${key}/:slug*` });
        rules.push({ source: `/${value}`, destination: `/vi/${key}` });
      } else {
        // Với tiếng Anh: Giữ nguyên tiền tố "/en/"
        rules.push({ source: `/en/${value}/:slug*`, destination: `/en/${key}/:slug*` });
        rules.push({ source: `/en/${value}`, destination: `/en/${key}` });
      }
    });
  });

  rules.push({
    source: '/error-500',
    destination: '/error-500',
  });

  rules.push({
    source: '/en/error-500',
    destination: '/en/error-500',
  });

  console.log("🔍 Rewrite rules:", rules);

  return rules;
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Chấp nhận tất cả domain
      },
      {
        protocol: "http",
        hostname: "**", // Chấp nhận cả HTTP (không bảo mật)
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  reactStrictMode: false,
  async rewrites() {
    return {
      beforeFiles: generateRewrites(),
    };
  },
};

export default nextConfig;