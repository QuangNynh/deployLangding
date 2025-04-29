'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'aos/dist/aos.css';
import Logo from '@/layout/Logo';
import Aos from 'aos';
import JourneyBackground from '@/assets/images/journey-background';

const JourneyItem = ({
    year,
    title,
    aosOffset,
}: {
    year: string;
    title: string;
    aosOffset: number;
}) => {
    return (
        <div
            className="flex items-center gap-2 rounded-[22px] border-4 border-[#D6D6D6] bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-offset={aosOffset}
        >
            <span className="text-2xl text-red-500">
                <Logo />
            </span>
            <div className="flex items-center gap-2">
                <p>
                    <span className="font-bold text-red-500">{year} </span>
                    <span className="font-bold text-[#2C2C2C] dark:text-white">{title} </span>
                </p>
            </div>
        </div>
    );
};

export const JourneySection: React.FC = () => {
    const { t } = useTranslation('about');
    const [aosOffset, setAosOffset] = useState(400); // Default offset

    useEffect(() => {
        const handleResize = () => {
            const windowHeight = window.innerHeight;
            setAosOffset(windowHeight > 800 ? 400 : 150); // Adjust offset based on window height
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call once to set initial offset

        Aos.init({
            duration: 1000,
            once: true, // Tránh chạy lại khi scroll
        });

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const journeyYears = ['2021', '2022', '2023', '2024', '2025'];

    return (
        <section className="container !px-4 md:!px-8 lg:!px-12 dark:bg-gray-900">
            <div className="relative dark:bg-gray-800">
                <div className="relative hidden sm:block">
                    <JourneyBackground t={t} className="h-full w-full" />
                </div>
                <div
                    className="journey-background-mobile-container flex flex-col gap-5 rounded-b-3xl px-3 pb-6 sm:hidden md:py-8 md:pb-0 lg:py-21 dark:bg-gray-800"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <div className="x-2 my-1 rounded-t-3xl bg-transparent py-5 md:py-8 lg:py-12 dark:bg-gray-800 md:hidden block">
                        <h2 className="px-2 text-center !text-3xl leading-[1.25] font-bold md:!text-5xl md:leading-[1] dark:text-white">
                            {t('journey-section.title')}
                        </h2>
                    </div>
                    {journeyYears.map((year) => (
                        <JourneyItem
                            key={year}
                            year={t(`journey-section.year.${year}`)}
                            title={t(`journey-section.${year}.title`)}
                            aosOffset={aosOffset}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JourneySection;
