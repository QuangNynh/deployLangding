'use client';

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import PeopleIcon from '../../assets/icons/people-icon';
import CultureIcon from '../../assets/icons/culture-icon';
import QualityIcon from '../../assets/icons/quality-icon';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams, useRouter } from 'next/navigation';
import { Locale } from '@/types/common';
import { getRoute } from '@/utils/routes';

export const MissionSection = () => {
    const { t } = useTranslation('home');
    const params = useParams<{ locale: Locale }>();
    const router = useRouter();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);

    const handleCardClick = (link?: string) => {
        if (link) {
            router.push(link);
        }
    };

    return (
        <section className="container mx-auto px-4 dark:bg-gray-900" style={{ marginTop: '1rem' }}>
            <h2 className="mb-4 text-center !text-[30px] font-bold text-[#fe0000] md:!text-5xl dark:text-white">
                {t('mission-section.title')}
            </h2>
            <p className="mx-auto mb-8 max-w-4xl text-center text-xl leading-[30px] text-[#2C2C2C] dark:text-gray-300">
                {t('mission-section.description')}
            </p>
            <div className="mx-auto grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
                {[
                    {
                        Icon: PeopleIcon,
                        title: t('mission-section.people.title'),
                        description: t('mission-section.people.description'),
                        link: getRoute('about-us', params.locale),
                    },
                    {
                        Icon: CultureIcon,
                        title: t('mission-section.culture.title'),
                        description: t('mission-section.culture.description'),
                        link: getRoute('about-us', params.locale),
                    },
                    {
                        Icon: QualityIcon,
                        title: t('mission-section.quality.title'),
                        description: t('mission-section.quality.description'),
                        link: getRoute('about-us', params.locale),
                    },
                ].map(({ Icon, title, description, link }, index) => (
                    <div
                        key={index}
                        className="min-h-[200px] transition-transform duration-300 hover:scale-105"
                    >
                        <div
                            className="h-full w-full cursor-pointer rounded-[22px] bg-white p-10 hover:shadow-lg dark:bg-gray-800"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            onClick={() => handleCardClick(link)}
                        >
                            <Icon className="mr-auto mb-8 h-16 w-16 dark:text-red-500" />
                            <h3 className="mb-4 text-2xl leading-9 font-bold hover:text-red-500 dark:text-white">
                                {title}
                            </h3>
                            <p className="text-xl leading-[30px] text-[#2C2C2C] dark:text-gray-300">
                                {description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
