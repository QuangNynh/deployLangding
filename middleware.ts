// import { NextRequest, NextResponse } from "next/server";
// import { i18nConfig } from "./src/i18nConfig";

// export function middleware(req: NextRequest) {
//   console.log("🔥 Middleware triggered!", req.nextUrl.pathname);
//   const url = req.nextUrl;
//   const { pathname } = url;
//   const pathSegments = pathname.split("/").filter(Boolean); // Bỏ dấu `/` thừa

//   // Cấu hình route map theo từng ngôn ngữ
//   const routeMap: Record<string, Record<string, string>> = {
//     vi: {
//       home: "trang-chu",
//       about: "ve-chung-toi",
//       posts: "bai-viet",
//     },
//     en: {
//       home: "home",
//       about: "about",
//       posts: "posts",
//     },
//   };

//   // Xác định locale từ URL
//   let detectedLocale = null;
//   if (i18nConfig.supportedLocales.includes(pathSegments[0])) {
//     detectedLocale = pathSegments.shift(); // Lấy locale nếu có
//   }

//   // Nếu không có locale, mặc định là "vi"
//   if (!detectedLocale) {
//     detectedLocale = "vi";
//   }

//   // Lấy danh sách route theo ngôn ngữ
//   const routeTranslations = routeMap[detectedLocale] || {};
//   const reversedMap = Object.fromEntries(
//     Object.entries(routeTranslations).map(([key, value]) => [value, key])
//   );

//   //  Kiểm tra nếu đường dẫn hiện tại là một route dịch
//   const translatedRoute = reversedMap[pathSegments[0]];
//   if (translatedRoute) {
//     const slug = pathSegments.slice(1).join("/"); // Lấy phần còn lại làm slug

//     const newPath = slug
//       ? `/${detectedLocale}/${translatedRoute}/${slug}` // `/vi/posts/my-article`
//       : `/${detectedLocale}/${translatedRoute}`; // `/vi/posts`

//     console.log(" Rewriting:", pathname, "➡", newPath);
//     return NextResponse.rewrite(new URL(newPath, req.url));
//   }

//   console.log(" No rewrite needed:", pathname);
//   return NextResponse.next();
// }

// // Áp dụng middleware cho tất cả route, ngoại trừ API, _next, assets
// export const config = {
//   matcher: "/((?!_next|api|favicon.ico).*)",
// };