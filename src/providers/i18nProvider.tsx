"use client";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { i18nConfig } from "@/i18nConfig";


export default function I18nProvider({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      const { locale } = resolvedParams;
      console.log('this is locale from i18nProvider', locale)
      if (!i18nConfig.supportedLocales.includes(locale)) {
        notFound(); 
      } else {
        setLocale(locale);
        i18n.changeLanguage(locale);
      }
    });
  }, [params]);

  if (!locale) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
