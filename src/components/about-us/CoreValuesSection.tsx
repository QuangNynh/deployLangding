'use client';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';

interface CoreValue {
    title: string;
    description: string;
    image: string;
    animation?: string;
}

export const CoreValuesSection: React.FC = () => {
    const { t } = useTranslation('about');

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);

    const coreValues: CoreValue[] = [
        {
            title: t('core-values-section.autonomy.title'),
            description: t('core-values-section.autonomy.description'),
            image: '/images/autonomy-image.png',
            animation: 'fade-down',
        },
        {
            title: t('core-values-section.connection.title'),
            description: t('core-values-section.connection.description'),
            image: '/images/connection-image.png',
            animation: 'fade-down',
        },
        {
            title: t('core-values-section.innovation.title'),
            description: t('core-values-section.innovation.description'),
            image: '/images/innovation-image.png',
            animation: 'fade-down',
        },
        {
            title: t('core-values-section.talent.title'),
            description: t('core-values-section.talent.description'),
            image: '/images/talent-image.png',
            animation: 'fade-down',
        },
    ];

    return (
        <section className="mx-auto my-1 py-5 md:py-6 dark:bg-gray-900">
            <div className="container !px-4 md:!px-8 lg:!px-12">
                <div className="mb-6 text-center md:mb-8">
                    <h2 className="mb-6 !text-3xl leading-[1.25] font-bold text-[#fe0000] md:!text-5xl md:leading-[1] dark:text-white">
                        {t('core-values-section.title')}
                    </h2>
                    <p className="mx-auto max-w-3xl text-base leading-[1.5] text-[#2C2C2C] md:text-xl lg:text-2xl dark:text-gray-300">
                        {t('core-values-section.description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {coreValues.map((value, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800 dark:shadow-gray-900"
                            data-aos={value.animation}
                            data-aos-delay={index * 100}
                        >
                            <div className="flex h-full flex-col">
                                <div className="flex flex-col justify-center p-6">
                                    <div className="mb-3 text-xl leading-[1.5] font-bold text-[#2C2C2C] hover:text-red-500 lg:text-2xl dark:text-white dark:hover:text-red-400">
                                        {value.title}
                                    </div>
                                    <p className="text-lg leading-[1.5] text-[#2C2C2C] lg:text-xl dark:text-gray-300">
                                        {value.description}
                                    </p>
                                </div>
                                <div className="relative mt-auto h-76 w-full flex-shrink-0 md:h-60">
                                    <Image
                                        src={value.image}
                                        alt={value.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreValuesSection;
