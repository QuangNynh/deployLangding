"use client";

import React from "react";
import { switchLanguage } from "@/utils/routes";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const { push } = useRouter(); // ✅ Chỉ lấy push()
  const pathname = usePathname(); // ✅ Lấy pathname
  const params = useParams<{ locale: string }>();

  return (
    <button
      onClick={() => switchLanguage(push, pathname, params.locale === "vi" ? "en" : "vi")}
      className="p-2 border rounded-md"
    >
      {params.locale === "vi" ? "🇬🇧 English" : "🇻🇳 Tiếng Việt"}
    </button>
  );
}
