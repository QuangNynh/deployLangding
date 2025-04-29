'use client';

import ImageCardAboutHome1 from '@/assets/images/image-card-about-home-1';
import ImageCardAboutHome2 from '@/assets/images/image-card-about-home-2';
import ImageCardAboutHome3 from '@/assets/images/image-card-about-home-3';
import ImageCardAboutHome4 from '@/assets/images/image-card-about-home-4';
import { Locale } from '@/types/common';
import { getRoute } from '@/utils/routes';
import 'aos/dist/aos.css';
import { useRouter, useParams } from 'next/navigation';
import React, { JSX } from 'react';
import { useTranslation } from 'react-i18next';

interface CardAboutProps {
    urlImage: JSX.Element;
    content: string;
    aos?: string;
    link?: string;
}

const CardAbout = ({ urlImage, content, aos, link }: CardAboutProps) => {
    const router = useRouter();

    const handleClick = () => {
        if (link) {
            router.push(link);
        }
    };

    return (
        <div
            className={`shadow-card flex flex-col items-center gap-4 rounded-[20px] bg-white transition-transform duration-300 hover:scale-105 dark:bg-gray-800 ${link ? 'cursor-pointer' : ''}`}
            data-aos={aos}
            onClick={handleClick}
        >
            <div className="h-[250px] w-full rounded-tl-[20px] rounded-tr-[20px] bg-[#F5EBEB]">
                {urlImage}
            </div>
            <p
                dangerouslySetInnerHTML={{ __html: content }}
                className="px-5 pb-8 text-center text-2xl leading-[125%] font-bold tracking-normal max-md:text-xl dark:text-white"
            />
        </div>
    );
};

export const AboutSection: React.FC = () => {
    const { t } = useTranslation('home');
    const params = useParams<{ locale: Locale }>();

    const dataCard = [
        {
            urlImage: <ImageCardAboutHome1 className="w-full" />,
            content: t('about-section.card-1-content'),
            aos: 'fade-up',
            link: `${getRoute('about-us', params.locale)}#team-section`,
        },
        {
            urlImage: <ImageCardAboutHome2 className="w-full" />,
            content: t('about-section.card-2-content'),
            aos: 'fade-down',
            link: getRoute('service-solution', params.locale),
        },
        {
            urlImage: <ImageCardAboutHome3 className="w-full" />,
            content: t('about-section.card-3-content'),
            aos: 'fade-up',
            link: getRoute('service-solution', params.locale),
        },
        {
            urlImage: <ImageCardAboutHome4 className="w-full" />,
            content: t('about-section.card-4-content'),
            aos: 'fade-down',
        },
    ];
    return (
        <div className="dark:bg-gray-900">
            <div className="container">
                <div className="mt-10 py-[50px] md:py-9 lg:py-[52px]">
                    <div className="flex flex-col gap-12 text-center">
                        <p className="text-5xl font-bold text-[#fe0000] max-md:text-3xl dark:text-white">
                            {t('about-section.title')}
                        </p>
                        <p
                            className="text-2xl leading-10 font-normal max-md:text-xl dark:text-gray-300"
                            dangerouslySetInnerHTML={{ __html: t('about-section.content') }}
                        />
                    </div>
                    <div className="mt-20 grid grid-cols-2 gap-6 max-sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                        {dataCard.map((item: CardAboutProps, index: number) => (
                            <CardAbout key={index} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
