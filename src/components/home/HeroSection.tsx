'use client';
import { useBanner } from '@/hooks/useBanner';
import { PageCodeBanner } from '@/types/static-content';
import React from 'react';
import BannerSection from '../common/BannerSection';
import { useTranslation } from 'react-i18next';
import { useParams, useRouter } from 'next/navigation';
import { getRoute } from '@/utils/routes';
import { Locale } from '@/types/common';

export const HeroSection = () => {
    const { data, isLoading } = useBanner(PageCodeBanner.HOME);
    const router = useRouter();
    const { t: tCommon } = useTranslation('common');
    const { t } = useTranslation('home');
    const banner = data?.[0] || null;
    const { locale } = useParams<{ locale: Locale }>();

    if (isLoading) {
        return (
            <div
                className={`flex h-[60vh] items-center justify-center ${!banner && 'animate-pulse bg-gray-200 dark:bg-gray-700'}`}
            >
                <div className="h-full w-full animate-pulse bg-gray-300 dark:bg-gray-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="relative aspect-video lg:aspect-16/6">
                <BannerSection banner={banner} />
                <div className="absolute -bottom-1 z-10 h-[36%] w-full bg-gradient-to-b from-[rgba(250,248,248,0)] to-[#FAF8F8] dark:from-[rgba(17,24,39,0)] dark:to-[#111827]"></div>

                <div className="absolute bottom-10 left-0 z-10 w-full md:bottom-12 lg:top-0 lg:h-full">
                    <div className="container h-full">
                        <div className="flex h-full flex-col items-center justify-center gap-9 lg:ml-20 lg:w-1/2 lg:items-start lg:gap-[52px]">
                            <h1 className="text-center !text-[20px] font-bold text-white md:!text-[48px] lg:!text-left">
                                {t('welcome')}
                            </h1>
                            <button
                                onClick={() => router.push(getRoute('about-us', locale))}
                                className="cursor-pointer rounded-[22px] border-2 border-white px-5 py-[10px] text-base font-bold text-white duration-300 hover:translate-x-1 hover:scale-105 hover:opacity-70 md:border-3 md:px-8 md:py-3 md:text-[20px]"
                            >
                                {tCommon('learn-more')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
