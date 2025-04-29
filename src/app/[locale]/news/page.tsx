/* eslint-disable @next/next/no-img-element */
'use client';
import SearchIcon from '@/assets/icons/search';
import ButtonRed from '@/components/common/ButtonRed';
import EmptyData from '@/components/common/EmptyData';
import { NewsItem } from '@/components/news/NewsItem';
import { newsService } from '@/services/newsService';
import { Locale, Pagination } from '@/types/common';
import { NewsResponse, NewsType, TypeNews } from '@/types/news';
import { convertDateToFormat, convertQueryParam } from '@/utils';
import { getRoute } from '@/utils/routes';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// Custom hooks
const useNews = (
    { pageSize = 10, pageNumber = 0 }: Pagination,
    filter?: Record<string, unknown>,
    locale?: string
) => {
    const pagination = { pageNumber, pageSize };
    const queryParams = convertQueryParam(filter || {});
    return useQuery<NewsResponse>({
        queryKey: ['news-detail', pagination, filter],
        queryFn: () => newsService.getNews(pagination, queryParams, locale),
    });
};

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

// Skeleton Components
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

const NewsGridSkeleton = ({ columns = 3 }) => (
    <div
        className={`grid gap-4 ${columns === 1 ? 'grid-cols-1' : 'sm:flex sm:snap-x sm:snap-mandatory sm:flex-nowrap sm:overflow-x-auto md:grid md:snap-none md:grid-cols-3 md:overflow-x-visible lg:grid-cols-3'}`}
    >
        {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="w-[calc(100%/1.5)] animate-pulse md:w-full">
                <div className="aspect-[4/3] w-full rounded-2xl bg-gray-200 dark:bg-gray-700" />
                <div className="mt-2 flex flex-col gap-2">
                    <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-6 w-full rounded bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>
        ))}
    </div>
);

const Divider = () => <div className="my-10 h-[1.5px] w-full bg-[#D6D6D67A] dark:bg-gray-700" />;

export default function NewsPage() {
    const params = useParams<{ slug: string; locale: Locale }>();
    const { t } = useTranslation('news');
    const { t: tCommon } = useTranslation('common');

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize] = useState(12);
    const [allNews, setAllNews] = useState<NewsType[]>([]); // Lưu tất cả tin tức
    const [valueInput, setValueInput] = useState<string>('');
    const [filter, setFilter] = useState({});

    const {
        data: responseNews,
        isLoading: isNewsLoading,
        isFetching,
    } = useNews({ pageNumber, pageSize }, filter, params.locale);

    const { data: responseNewsLatest, isLoading: isLatestLoading } = useNewsByType(
        { pageNumber: 0, pageSize: 5 },
        TypeNews.NEW,
        params.locale
    );
    const { data: responseNewsTrending, isLoading: isTrendingLoading } = useNewsByType(
        { pageNumber: 0, pageSize: 3 },
        TypeNews.HOT,
        params.locale
    );

    const newsLatest: NewsType[] = responseNewsLatest?.content ?? [];
    const newsTrending: NewsType[] = responseNewsTrending?.content ?? [];

    // Cập nhật danh sách tin tức khi nhận được dữ liệu mới
    useEffect(() => {
        if (responseNews?.content) {
            if (pageNumber === 0) {
                setAllNews(responseNews.content);
            } else {
                setAllNews((prev) => [...prev, ...responseNews.content]);
            }
        }
    }, [responseNews, pageNumber]);

    // Xử lý nút Load More
    const handleLoadMore = () => {
        setPageNumber((prev) => prev + 1);
    };

    // Kiểm tra xem còn dữ liệu để tải không
    const totalElements = responseNews?.totalElements as number;
    const hasMore = allNews?.length < totalElements;
    return (
        <section className="py-6 dark:bg-gray-900">
            <div className="container">
                {/* Featured News */}
                {isLatestLoading ? (
                    <FeaturedNewsSkeleton />
                ) : newsLatest.length > 0 ? (
                    <div className="grid grid-cols-12 gap-8 pb-6 lg:gap-12">
                        <Link
                            href={`${getRoute('news', params.locale)}/${newsLatest[0].urlPath}`}
                            className="group col-span-12 flex w-full flex-col gap-4 md:col-span-8 md:gap-6"
                        >
                            <div className="aspect-[9/5] w-full overflow-hidden">
                                <img
                                    src={newsLatest[0].avatar}
                                    alt={newsLatest[0].title}
                                    className="h-full w-full rounded-lg object-cover duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="line-clamp-1 text-[30px] font-bold group-hover:text-[#CC0000] md:text-[48px] dark:text-white dark:group-hover:text-[#FF4D4D]">
                                    {newsLatest[0].title}
                                </span>
                                <div className="font-medium text-[#CC0000] dark:text-[#FF4D4D]">
                                    {newsLatest[0].card.join(', ')}
                                </div>
                                <span className="text-[#E1CBCC] dark:text-gray-400">
                                    {convertDateToFormat(newsLatest[0].datePosted as string)}
                                </span>
                            </div>
                        </Link>
                        <div className="col-span-12 md:col-span-4">
                            <div className="flex flex-col gap-8 lg:gap-12">
                                {newsLatest.slice(1).map((news) => (
                                    <Link
                                        href={`${getRoute('news', params.locale)}/${news.urlPath}`}
                                        key={news.urlPath}
                                        className="group grid grid-cols-2 gap-6"
                                    >
                                        <div className="aspect-[3/2] w-full overflow-hidden">
                                            <img
                                                src={news.avatar}
                                                alt={news.title}
                                                className="h-full w-full rounded-lg object-cover duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-sm text-[#2C2C2C] dark:text-gray-400">
                                                {convertDateToFormat(news.datePosted as string)}
                                            </span>
                                            <span className="line-clamp-3 font-bold text-[#2C2C2C] group-hover:text-[#CC0000] dark:text-white dark:group-hover:text-[#FF4D4D]">
                                                {news.title}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : null}

                <Divider />

                {/* Trending News */}
                <div className="flex flex-col gap-6">
                    <span className="text-[30px] font-bold text-[#fe0000] dark:text-white">
                        {t('trending-section.title')}
                    </span>
                    {isTrendingLoading ? (
                        <NewsGridSkeleton columns={3} />
                    ) : newsTrending.length > 0 ? (
                        <div className="flex w-full snap-x snap-mandatory flex-nowrap gap-3 overflow-x-auto md:grid md:snap-none md:grid-cols-3 md:gap-6 md:overflow-x-visible lg:grid-cols-3">
                            {newsTrending.map((news) => (
                                <div key={news.urlPath} className="w-2/3 flex-shrink-0 md:w-full">
                                    <NewsItem
                                        news={news}
                                        rootRouter={getRoute('news', params.locale)}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyData />
                    )}
                </div>

                <Divider />

                {/* All News */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <span className="text-[30px] font-bold text-[#fe0000] dark:text-white">
                            {t('synthetic-section.title')}
                        </span>
                        <div className="flex w-1/2 items-center justify-center gap-3 max-md:w-full xl:w-1/3">
                            <input
                                onChange={(e) => setValueInput(e.target.value)}
                                value={valueInput}
                                onKeyDown={(e) =>
                                    e.key === 'Enter' && setFilter({ title: valueInput })
                                }
                                type="text"
                                placeholder={tCommon('search')}
                                className="w-full rounded-full border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-400 dark:focus:border-blue-400"
                            />
                            <div
                                className="cursor-pointer rounded-full bg-gradient-to-r from-[#FF4D4D] to-[#CC0000] p-3 text-white"
                                onClick={() => {
                                    setFilter({ title: valueInput });
                                    setPageNumber(0); // Reset về trang đầu khi tìm kiếm
                                    setAllNews([]); // Xóa danh sách cũ
                                }}
                            >
                                <SearchIcon className="dark:text-white" />
                            </div>
                        </div>
                    </div>
                    {isNewsLoading && pageNumber === 0 ? (
                        <NewsGridSkeleton columns={3} />
                    ) : allNews.length ? (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {allNews.map((news) => (
                                <div key={news.urlPath} className="w-full">
                                    <NewsItem
                                        news={news}
                                        rootRouter={getRoute('news', params.locale)}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyData />
                    )}
                    {isNewsLoading && pageNumber > 0 && <NewsGridSkeleton columns={3} />}
                    {hasMore && (
                        <div className="mt-6 flex justify-center">
                            <ButtonRed
                                onClick={handleLoadMore}
                                disabled={isFetching}
                                className="px-8 py-2 whitespace-nowrap"
                            >
                                {isFetching ? tCommon('loading') : tCommon('load-more')}
                            </ButtonRed>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
