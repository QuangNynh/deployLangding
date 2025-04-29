'use client';

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import { NewsType, TypeNews } from '@/types/news';
import { Locale, Pagination } from '@/types/common';
import { NewsResponse } from '@/types/news';
import { useQuery } from '@tanstack/react-query';
import { newsService } from '@/services/newsService';
import { useParams } from 'next/navigation';
import { getRoute } from '@/utils/routes';
import Link from 'next/link';
import EmptyData from '@/components/common/EmptyData';

export const InternalNewsSection: React.FC = () => {
    const params = useParams<{ slug: string; locale: Locale }>();

    const useNewsByType = (
        { pageSize = 5, pageNumber = 0 }: Pagination,
        type: TypeNews,
        locale?: string
    ) => {
        const query = `type=${type}`;
        return useQuery<NewsResponse>({
            queryKey: ['news-latest', { pageNumber, pageSize }],
            queryFn: () => newsService.getNews({ pageNumber, pageSize }, query, locale),
        });
    };

    const { data: responseNewsLatest, isLoading: isLatestLoading } = useNewsByType(
        { pageNumber: 0, pageSize: 4 },
        TypeNews.COMPANY,
        params.locale
    );

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const newsLatest: NewsType[] = responseNewsLatest?.content ?? [];

    const [hoverState, setHoverState] = useState<{ [key: string]: boolean }>({});

    return (
        <section className="mx-auto py-6 md:py-9">
            <div className="container !px-4 md:!px-8 lg:!px-12">
                {isLatestLoading ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse cursor-default overflow-hidden rounded-2xl bg-gray-200 shadow-lg"
                            >
                                <div className="relative h-[300px] w-full md:h-[360px] xl:h-[420px]">
                                    <div className="h-full w-full bg-gray-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : newsLatest.length === 0 ? (
                    <EmptyData />
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {newsLatest.map((news, index) => (
                            <Link
                                key={news.id}
                                href={`${getRoute('news', params.locale)}/${news.urlPath}`}
                                className="relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                onMouseEnter={() =>
                                    setHoverState((prevState) => ({
                                        ...prevState,
                                        [news.id]: true,
                                    }))
                                }
                                onMouseLeave={() =>
                                    setHoverState((prevState) => ({
                                        ...prevState,
                                        [news.id]: false,
                                    }))
                                }
                            >
                                {/* Hình ảnh */}
                                <div className="relative h-[300px] w-full overflow-hidden lg:h-[360px] xl:h-[420px]">
                                    <Image
                                        src={isValidUrl(news.avatar) ? news.avatar : ''}
                                        alt={news.title}
                                        fill
                                        className={`object-cover transition-transform duration-300 ${hoverState[news.id] ? 'scale-110' : ''}`}
                                    />
                                    {/* Lớp phủ */}
                                    <div
                                        className={`absolute inset-0 transform bg-gradient-to-b from-gray-200 to-gray-800 opacity-20 transition-all duration-700 ease-out ${
                                            hoverState[news.id] ? 'opacity-50' : ''
                                        }`}
                                    />
                                </div>
                                {/* Chữ */}
                                <div className="absolute bottom-4 left-0 w-full p-4 text-white transition-opacity duration-5000 ease-in-out">
                                    <h3
                                        className={`line-clamp-2 transform overflow-hidden !text-2xl leading-[1.5] font-bold text-ellipsis transition-all duration-500 ease-out ${
                                            hoverState[news.id]
                                                ? 'line-clamp-none translate-y-4 overflow-visible opacity-100'
                                                : 'translate-y-4 opacity-100'
                                        }`}
                                    >
                                        {news.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default InternalNewsSection;
