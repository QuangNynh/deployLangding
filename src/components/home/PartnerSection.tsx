'use client';

import MarqueeIcon from '../common/MarqueeIcon';
import { useEffect } from 'react';

export const PartnerSection = () => {
    const ListImage = [
        '/images/partner-images/partner-image-1.png',
        '/images/partner-images/partner-image-2.png',
        '/images/partner-images/partner-image-3.png',
        '/images/partner-images/partner-image-4.png',
        '/images/partner-images/partner-image-5.png',
        '/images/partner-images/partner-image-6.png',
    ];

    useEffect(() => {
        const updateGradientColor = () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            document.documentElement.style.setProperty(
                '--gradient-color',
                isDarkMode ? '#111827' : '#FAF8F8'
            );
        };

        updateGradientColor();

        const observer = new MutationObserver(updateGradientColor);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="dark:bg-gray-900">
            <div className="container">
                <div className="flex flex-col items-center gap-9 py-10">
                    <MarqueeIcon content={ListImage} />
                    <MarqueeIcon content={ListImage} direction="right" />
                </div>
            </div>
        </div>
    );
};
