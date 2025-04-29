/* eslint-disable @next/next/no-img-element */
import { NewsType } from '@/types/news';
import Link from 'next/link';
import EmptyData from '../common/EmptyData';
import Image from 'next/image';
import { convertDateToFormat } from '@/utils';

interface Props {
    rootRouter: string;
    data: NewsType[];
    isLoading: boolean;
}

export const RelatedNewsSection = ({ rootRouter, data, isLoading }: Props) => {
    return (
        <div className="relative">
            {data.length > 1 && (
                <div className="absolute top-0 -right-[1px] z-10 h-full w-[40px] bg-gradient-to-r from-[rgba(250,248,248,0)] to-[#FAF8F8] dark:from-[rgba(17,24,39,0)] dark:to-[#111827]"></div>
            )}
            <div className="flex snap-x snap-mandatory flex-nowrap gap-4 overflow-x-auto md:grid md:snap-none md:grid-cols-3 md:overflow-x-visible lg:grid-cols-1">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className={`grid ${data.length > 1 ? 'w-[calc(100%/1.5)]' : 'w-full'} flex-shrink-0 animate-pulse snap-start grid-cols-12 gap-6 md:w-1/3 lg:w-full`}
                        >
                            <div className="relative col-span-5 aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700" />
                            <div className="col-span-7 flex flex-col gap-2">
                                <div className="h-4 w-24 rounded-md bg-gray-200 dark:bg-gray-700" />
                                <div className="h-6 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
                            </div>
                        </div>
                    ))
                ) : data.length > 0 ? (
                    data.map((news) => (
                        <Link
                            href={`${rootRouter}/${news.urlPath}`}
                            key={news.id}
                            className={`group grid ${data.length > 1 ? 'w-[calc(100%/1.5)]' : 'w-full'} flex-shrink-0 cursor-pointer snap-start grid-cols-12 gap-3 md:w-1/3 md:gap-6 lg:w-full`}
                        >
                            <div className="relative col-span-12 aspect-[4/3] overflow-hidden rounded-2xl bg-amber-400 lg:col-span-4">
                                {news?.avatar ? (
                                    <Image
                                        src={news?.avatar}
                                        alt={news?.title}
                                        fill
                                        className="rounded-2xl object-cover duration-500 group-hover:scale-105"
                                    />
                                ) : null}
                            </div>
                            <div className="col-span-12 flex min-h-[80px] flex-col items-start gap-2 lg:col-span-8">
                                <span className="line-clamp-1 text-sm text-[#2C2C2C] dark:text-gray-400">
                                    {convertDateToFormat(news.datePosted as string) ||
                                        'Chưa có ngày'}
                                </span>
                                <span className="line-clamp-2 font-bold break-words text-[#2C2C2C] group-hover:text-[#CC0000] dark:text-white dark:group-hover:text-[#FF4D4D]">
                                    {news.title}
                                </span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <EmptyData />
                )}
            </div>
        </div>
    );
};
