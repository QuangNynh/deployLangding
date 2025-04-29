import { AboutSection } from '@/components/home/AboutSection';
import BreakThroughSection from '@/components/home/BreakThroughSection';
import { FeaturedNewsSection } from '@/components/home/FeaturedNewsSection';
import { HeroSection } from '@/components/home/HeroSection';
import ImpressiveStatsSection from '@/components/home/ImpressiveStatsSection';
import IntroSection from '@/components/home/IntroSection';
import { MissionSection } from '@/components/home/MissionSection';
import { PartnerSection } from '@/components/home/PartnerSection';
import { ProductSection } from '@/components/home/ProductSection';
export default function Home() {
    return (
        <div className="overflow-auto dark:bg-gray-900 dark:text-white">
            <IntroSection />
            <HeroSection />
            <AboutSection />
            <BreakThroughSection />
            <ProductSection />
            <ImpressiveStatsSection />
            <PartnerSection />
            <MissionSection />
            <FeaturedNewsSection />
        </div>
    );
}
