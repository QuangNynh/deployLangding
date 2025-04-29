'use client';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface CorePrinciple {
    title: string;
    animation?: string;
}

export const CorePrinciplesSection: React.FC = () => {
    const { t } = useTranslation('about');

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);

    const corePrinciples: CorePrinciple[] = [
        {
            title: t('core-principles-section.independence'),
        },
        {
            title: t('core-principles-section.responsibility'),
        },
        {
            title: t('core-principles-section.cooperation'),
        },
    ];

    return (
        <section className="mx-auto my-1 py-5 md:py-8 lg:!py-24">
            <div className="container !px-4 md:!px-8 lg:!px-12">
                <div className="flex flex-col items-center justify-center gap-6">
                    {corePrinciples.map((principle, index) => (
                        <div
                            key={index}
                            className="animate-color-change text-center text-3xl leading-[1.25] font-bold md:text-5xl md:leading-[1] lg:text-6xl lg:leading-[1]"
                            style={{
                                animation: `colorChange 3s infinite ease-in-out ${index * 0.5}s`,
                            }}
                        >
                            {principle.title}
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                @keyframes colorChange {
                    0% {
                        color: #ff9999;
                    }
                    25% {
                        color: #ff6666;
                    }
                    50% {
                        color: #ff4d4d;
                    }
                    75% {
                        color: #ff6666;
                    }
                    100% {
                        color: #ff9999;
                    }
                }

                .animate-color-change {
                    animation: colorChange 6s infinite ease-in-out;
                }
            `}</style>
        </section>
    );
};
