'use client';
import BannerSection from '@/components/common/BannerSection';
import ServiceConclusionSection from '@/components/service-solution/ServiceSolutionSection';
import { TechnologySection } from '@/components/service-solution/TechnologySection';
import { useBanner } from '@/hooks/useBanner';
import { PageCodeBanner } from '@/types/static-content';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import { ContactForm } from '@/components/contact/ContactForm';

const ServiceSolutionPage = () => {
    const { t } = useTranslation('service-solution');

    const { data } = useBanner(PageCodeBanner.SERVICES_SOLUTIONS);
    const banner = data?.[0] || null;

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);

    return (
        <section className="dark:bg-gray-900">
            <div className="container flex flex-col">
                <div className="flex flex-col gap-6 py-6 md:gap-9 md:pt-9 md:pb-9 lg:gap-[50px] lg:pb-24">
                    <h2
                        className="text-center !text-[30px] font-bold md:!text-[48px]  dark:text-white"
                        data-aos="fade-zoom-in"
                    >
                        {t('title')}
                    </h2>
                    <div
                        className={`relative aspect-[4/3] w-full overflow-hidden rounded-[28px] md:aspect-[21/9] ${
                            !banner && 'animate-pulse bg-gray-200 dark:bg-gray-700'
                        }`}
                    >
                        <BannerSection banner={banner} />
                    </div>
                </div>
                <TechnologySection />
                <ServiceConclusionSection />
                <div className="mx-auto max-w-3xl py-12" data-aos="fade-up">
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

export default ServiceSolutionPage;
