'use client';

import { Locale } from '@/types/common';
import { getRoute } from '@/utils/routes';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { JSX, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BagIcon from '../../assets/icons/bag-icon';
import DocumentIcon from '../../assets/icons/document-icon';
import UserIcon from '../../assets/icons/user-icon';
import ButtonRed from '../common/ButtonRed';

interface CardAboutProps {
    urlImage: string;
    contentButton: string;
    aos?: string;
    icon?: JSX.Element;
}

const Card: React.FC<CardAboutProps> = ({ urlImage, contentButton, aos, icon }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const params = useParams<{ slug: string; locale: Locale }>();
    return (
        <div
            className="mx-auto flex w-full max-w-full flex-col items-center rounded-2xl bg-white shadow-lg sm:max-w-2/3 lg:max-w-[640px] dark:bg-gray-800 dark:shadow-gray-900"
            data-aos={aos}
        >
            <div className="relative aspect-[7/5] w-full">
                <Image src={urlImage} alt="image" fill className="rounded-t-2xl object-cover" />
            </div>
            <div className="py-5">
                <Link href={getRoute('service-solution', params.locale)}>
                    <ButtonRed
                        className="px-5 py-2 text-base font-bold md:text-xl"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="flex items-center gap-2">
                            {icon &&
                                React.isValidElement(icon) &&
                                React.cloneElement(icon as React.ReactElement<{ color?: string }>, {
                                    color: isHovered ? '#E62626' : '#FAF8F8',
                                })}
                            {contentButton}
                        </div>
                    </ButtonRed>
                </Link>
            </div>
        </div>
    );
};

const BreakThroughSection: React.FC = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false, // Tránh chạy lại khi scroll
        });
    }, []);

    const { t } = useTranslation('home');

    const dataCard: CardAboutProps[] = [
        {
            urlImage:
                'https://d2vbakfwy2qyfl.cloudfront.net/4dfcc487-19dd-4a65-9f3b-03dbcdb6d749.png',
            contentButton: t('breakthrough-section.card-1-content-button'),
            aos: 'zoom-in-up',
            icon: <DocumentIcon />,
        },
        {
            urlImage:
                'https://d2vbakfwy2qyfl.cloudfront.net/90fde9a6-cdd2-4aaf-b8cf-12986acb3a1b.png',
            contentButton: t('breakthrough-section.card-2-content-button'),
            aos: 'fade-up',
            icon: <BagIcon />,
        },
        {
            urlImage:
                'https://d2vbakfwy2qyfl.cloudfront.net/ea772af7-3938-4b40-89bc-c6b9ca11c2e8.png',
            contentButton: t('breakthrough-section.card-3-content-button'),
            aos: 'zoom-in-down',
            icon: <UserIcon />,
        },
    ];

    return (
        <div className="container mx-auto px-4 dark:bg-gray-900">
            <div className="flex flex-col items-center gap-14 py-10">
                <h2 className="text-center !text-5xl font-bold text-[#fe0000] max-md:!text-3xl dark:text-white">
                    {t('breakthrough-section.title')}
                </h2>
                <div className="grid w-full grid-cols-1 gap-8 md:gap-6 xl:grid-cols-3">
                    {dataCard.map((item, index) => (
                        <Card key={index} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BreakThroughSection;
