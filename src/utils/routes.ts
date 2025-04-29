"use client";
import { ROUTES } from "@/constants/routes";

// Hàm lấy route theo ngôn ngữ
export const getRoute = (key: keyof typeof ROUTES.vi, locale: "vi" | "en", slug?: string) => {
    const route = ROUTES[locale][key];
    const path = typeof route === "function" ? route(slug!) : route;
    return locale === "vi" ? path : `/${locale}${path}`;
  };

// 🟢 Hàm chuyển đổi ngôn ngữ dựa trên đường dẫn hiện tại
export const switchLanguage = (push: (path: string) => void, pathname: string, newLocale: "vi" | "en") => {
  const currentLocale = pathname.startsWith("/en") ? "en" : "vi"; // Xác định locale hiện tại
  // Nếu đang ở trang chủ
  if (pathname === "/" || pathname === "/vi" || pathname === "/en") {
    push(newLocale === "vi" ? "/" : "/en");
    return;
  }

  // Xử lý các trang khác
  if (currentLocale === "vi") {
    // Đang ở tiếng Việt, chuyển sang tiếng Anh
    if (pathname.startsWith("/vi/")) {
      // Lấy phần đường dẫn sau "/vi/"
      const path = pathname.substring(4);
      push(`/en${path}`);
    } else {
      // Đường dẫn không có "/vi/" (có thể là đường dẫn đã được rewrite)
      // Tìm trong ROUTES.vi để xác định route tương ứng
      const routeEntries = Object.entries(ROUTES.vi);
      for (const [key, value] of routeEntries) {
        if (typeof value === 'string' && pathname === value) {
          // Tìm thấy route tương ứng, lấy route tiếng Anh
          const enRoute = ROUTES.en[key as keyof typeof ROUTES.vi];
          if (enRoute) {
            push(`/en${typeof enRoute === 'string' ? enRoute : ''}`);
            return;
          }
        }
      }
      // Nếu không tìm thấy, thử thêm "/en" vào đầu
      push(`/en${pathname}`);
    }
  } else {
    // Đang ở tiếng Anh, chuyển sang tiếng Việt
    if (pathname.startsWith("/en/")) {
      // Lấy phần đường dẫn sau "/en/"
      const path = pathname.substring(4);
      // Tìm trong ROUTES.en để xác định key route
      const routeEntries = Object.entries(ROUTES.en);
      for (const [key, value] of routeEntries) {
        if (typeof value === 'string' && `/en${value}` === pathname) {
          // Tìm thấy route tương ứng, lấy route tiếng Việt
          const viRoute = ROUTES.vi[key as keyof typeof ROUTES.en];
          if (viRoute) {
            push(typeof viRoute === 'string' ? viRoute : '');
            return;
          }
        }
      }
      // Nếu không tìm thấy, thử bỏ "/en" ở đầu
      push(path);
    } else {
      // Trường hợp đặc biệt, có thể không xảy ra
      push(pathname.replace(/^\/en/, ""));
    }
  }
};

