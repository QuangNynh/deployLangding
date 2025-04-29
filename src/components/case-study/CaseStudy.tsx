'use client';

import { caseStudyService } from '@/services/caseStudyService';
import { Locale } from '@/types/common';
import { isValidUrl } from '@/utils';
import { getRoute } from '@/utils/routes';
import { useQuery } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import EmptyData from '../common/EmptyData';

interface CardProps {
    title: string;
    shortDescription: string;
    thumbnailUrl: string;
    urlSlug: string;
}

const CardBig = ({ title, shortDescription, thumbnailUrl, urlSlug }: CardProps) => {
    const params = useParams<{ slug: string; locale: Locale }>();
    return (
        <Link
            href={`${getRoute('case-study', params.locale)}/${urlSlug}`}
            className={`relative flex cursor-pointer flex-col overflow-hidden rounded-[16px] bg-white shadow-md lg:col-span-7 dark:bg-gray-800`}
            data-aos="zoom-in-up"
            data-aos-duration="1000"
        >
            <div className="flex flex-col p-6">
                <h3 className="line-clamp-1 bg-gradient-to-r from-[#FF4D4D] to-[#FF0000] bg-clip-text !text-2xl font-bold text-transparent">
                    {title}
                </h3>
                <p className="line-clamp-1 text-lg text-[#2C2C2C] dark:text-gray-300">
                    {shortDescription}
                </p>
            </div>
            <div className="relative h-[300px] w-full">
                <Image
                    src={isValidUrl(thumbnailUrl) ? thumbnailUrl : ''}
                    alt={title}
                    fill
                    className="rounded-b-[16px] object-cover"
                />
            </div>
        </Link>
    );
};

const CardSmall = ({ title, shortDescription, thumbnailUrl, urlSlug }: CardProps) => {
    const params = useParams<{ slug: string; locale: Locale }>();
    return (
        <Link
            href={`${getRoute('case-study', params.locale)}/${urlSlug}`}
            className={`relative flex cursor-pointer flex-col overflow-hidden rounded-[16px] bg-white shadow-md lg:col-span-5 dark:bg-gray-800`}
            data-aos="zoom-in-down"
            data-aos-duration="1000"
        >
            <div className="relative h-[300px] w-full">
                <Image
                    src={isValidUrl(thumbnailUrl) ? thumbnailUrl : ''}
                    alt={title}
                    fill
                    className="object-cover lg:rounded-t-[16px]"
                />
            </div>
            <div className="flex flex-col p-6 max-lg:order-first">
                <h3 className="line-clamp-1 bg-gradient-to-r from-[#FF4D4D] to-[#FF0000] bg-clip-text !text-2xl font-bold text-transparent max-md:!text-xl">
                    {title}
                </h3>
                <p className="line-clamp-1 text-lg text-[#2C2C2C] max-md:text-base dark:text-gray-300">
                    {shortDescription}
                </p>
            </div>
        </Link>
    );
};

export const CaseStudy = () => {
    const params = useParams<{ slug: string; locale: Locale }>();
    const { data: dataCaseStudy } = useQuery({
        queryKey: ['case-study'],
        queryFn: () => caseStudyService.getCaseStudy(params.locale),
    });
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false, // Tránh chạy lại khi scroll
        });
    }, []);

    return (
        <div className="lg:px-6 lg:py-10 dark:bg-gray-900">
            <h2 className="mb-8 text-center !text-5xl font-bold text-[#fe0000] max-md:!text-[30px] dark:text-white">
                Case Study
            </h2>
            {dataCaseStudy?.data?.content?.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {dataCaseStudy?.data?.content.map((item: CardProps, index: number) =>
                        [1, 2].includes(index % 4) ? (
                            <CardSmall key={index} {...item} />
                        ) : (
                            <CardBig key={index} {...item} />
                        )
                    )}
                </div>
            ) : (
                <EmptyData />
            )}
        </div>
    );
};
