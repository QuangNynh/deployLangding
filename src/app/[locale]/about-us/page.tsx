'use client';
import { CorePrinciplesSection } from '@/components/about-us/CorePrinciplesSection';
import { CoreValuesSection } from '@/components/about-us/CoreValuesSection';
import InternalNewsSection from '@/components/about-us/InternalNewsSection';
import { JourneySection } from '@/components/about-us/JourneySection';
import { TeamSection } from '@/components/about-us/TeamSection';
import { VisionDetailSection } from '@/components/about-us/VisionDetailSection';
import BannerSection from '@/components/common/BannerSection';
import { useBanner } from '@/hooks/useBanner';
import { PageCodeBanner } from '@/types/static-content';
import { useTranslation } from 'react-i18next';

export default function About() {
    const { data } = useBanner(PageCodeBanner.ABOUT_US);
    const { t } = useTranslation('about');
    const banner = data?.[0] || null;

    return (
        <div className="dark:bg-gray-900 dark:text-white">
            <div
                className={`relative aspect-[21/9] w-full overflow-hidden ${!banner && 'animate-pulse bg-gray-200 dark:bg-gray-700'}`}
            >
                <BannerSection banner={banner} />
                <div className="absolute top-0 left-0 h-full w-full">
                    <div className="container flex h-full items-center justify-center">
                        <div className="text-center text-4xl font-bold text-white sm:text-5xl md:text-7xl lg:text-[108px]">
                            {t('about-us')}
                        </div>
                    </div>
                </div>
            </div>
            <VisionDetailSection />
            <JourneySection />
            <TeamSection />
            <CoreValuesSection />
            <CorePrinciplesSection />
            <InternalNewsSection />
        </div>
    );
}
