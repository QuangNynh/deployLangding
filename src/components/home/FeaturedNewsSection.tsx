/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { newsService } from '@/services/newsService';
import { useQuery } from '@tanstack/react-query';
import { NewsResponse, NewsType, TypeNews } from '@/types/news';
import { Locale, Pagination } from '@/types/common';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getRoute } from '@/utils/routes';
import EmptyData from '@/components/common/EmptyData';

export const FeaturedNewsSection = () => {
    const params = useParams<{ slug: string; locale: Locale }>();

    const { t } = useTranslation('home');
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

    const { data: responseNewsLatest, isLoading } = useNewsByType(
        { pageNumber: 0, pageSize: 4 },
        TypeNews.HOT,
        params.locale
    );

    const featuredNews: NewsType[] = responseNewsLatest?.content ?? [];

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const renderSectionLayout = (children: React.ReactNode) => (
        <section
            className="container mx-auto px-4 dark:bg-gray-900"
            style={{ marginTop: '3rem', marginBottom: '3rem' }}
        >
            <div className="mb-8 text-center text-[30px] leading-12 font-bold text-[#fe0000] md:mb-13 md:text-5xl dark:text-white">
                {t('featured-news.title')}
            </div>
            {children}
        </section>
    );

    const ImageSkeleton = ({ className }: { className?: string }) => (
        <div
            className={`w-full animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700 ${className || ''}`}
        />
    );

    const FeaturedNewsSkeleton = () => (
        <div className="grid animate-pulse grid-cols-12 lg:gap-12">
            <div className="col-span-12 flex flex-col gap-6 lg:col-span-8">
                <div className="aspect-[9/5] w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
                <div className="flex flex-col gap-2">
                    <div className="h-12 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-1/6 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>
            <div className="col-span-12 mt-6 flex flex-col gap-12 lg:col-span-4 lg:mt-0">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="grid grid-cols-2 gap-6">
                        <div className="aspect-[3/2] w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
                        <div className="flex flex-col gap-2">
                            <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                            <div className="h-6 w-full rounded bg-gray-200 dark:bg-gray-700" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (isLoading) {
        return renderSectionLayout(<FeaturedNewsSkeleton />);
    }

    if (featuredNews.length === 0) {
        return renderSectionLayout(<EmptyData />);
    }

    return renderSectionLayout(
        <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            {/* Ảnh lớn */}
            <Link
                href={`${getRoute('news', params.locale)}/${featuredNews[0]?.urlPath}`}
                className="flex flex-col gap-6 overflow-hidden bg-transparent md:col-span-7"
            >
                <div className="h-auto max-h-[350px] w-full overflow-hidden rounded-2xl md:max-h-[450px]">
                    {isValidUrl(featuredNews[0].avatar) ? (
                        <Image
                            src={featuredNews[0].avatar}
                            alt={featuredNews[0].title}
                            width={646}
                            height={450}
                            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                    ) : (
                        <ImageSkeleton className="aspect-[9/5] h-full" />
                    )}
                </div>
                <div>
                    <p className="md:text-md mb-3 text-sm text-[#8F7E7E] md:mb-6 dark:text-gray-400">
                        {new Date(featuredNews[0].createdAt).toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })}
                    </p>
                    <h3 className="mb-3 line-clamp-2 cursor-pointer !text-2xl leading-[115%] font-semibold text-[#2C2C2C] hover:text-red-500 md:mb-5 md:!text-4xl dark:text-white">
                        {featuredNews[0].title}
                    </h3>
                    <p className="line-clamp-3 text-lg text-[#2C2C2C] md:text-2xl dark:text-gray-300">
                        {featuredNews[0].shortDescription}
                    </p>
                </div>
            </Link>

            {/* Ảnh nhỏ */}
            <div className="flex gap-6 overflow-x-auto sm:grid sm:grid-cols-3 sm:overflow-visible md:col-span-5 md:flex md:flex-col md:gap-12">
                {featuredNews.slice(1).map((item: NewsType) => (
                    <Link
                        href={`${getRoute('news', params.locale)}/${item.urlPath}`}
                        key={item.id}
                        className="flex min-w-[200px] flex-col gap-4 overflow-hidden bg-transparent sm:min-w-full md:h-[180px] md:flex-row md:gap-6"
                    >
                        <div className="h-[160px] w-full overflow-hidden rounded-[22px] md:h-[180px] md:w-1/2">
                            {isValidUrl(item?.avatar) ? (
                                <img
                                    src={item.avatar}
                                    alt={item.title}
                                    width={312}
                                    height={234}
                                    className="h-full w-full rounded-[22px] object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                    loading="lazy"
                                    decoding="async"
                                    data-nimg="1"
                                />
                            ) : (
                                <ImageSkeleton className="h-full rounded-[22px]" />
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="mb-2 text-xs text-[#2C2C2C] md:text-sm dark:text-gray-400">
                                {new Date(item.createdAt).toLocaleDateString('vi-VN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}
                            </p>
                            <h4 className="mb-2 line-clamp-2 cursor-pointer text-lg font-bold text-[#2C2C2C] hover:text-red-500 md:text-xl dark:text-white">
                                {item.title}
                            </h4>
                            <p className="line-clamp-3 text-sm text-[#2C2C2C] md:text-base dark:text-gray-300">
                                {item.shortDescription}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
