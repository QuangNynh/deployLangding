'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export const VisionDetailSection: React.FC = () => {
    const { t } = useTranslation('about');

    return (
        <section className="mx-auto my-1 py-5 md:py-8 lg:py-12 dark:bg-gray-900">
            <div className="container !px-4 text-center md:!px-8 lg:!px-12">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="mb-1 !text-xl leading-[1.25] font-bold text-[#FF0000] md:mb-3.5 md:!text-3xl lg:!text-4xl">
                        {t('vision-section.title')}
                    </h2>
                    <p className="max-w-[900px] text-base leading-[1.5] text-[#2C2C2C] md:text-xl lg:text-2xl dark:text-white">
                        {t('vision-section.subtitle')}
                    </p>
                </div>
            </div>
        </section>
    );
};
