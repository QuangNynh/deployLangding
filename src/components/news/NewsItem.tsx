/* eslint-disable @next/next/no-img-element */
import { NewsType } from '@/types/news';
import { convertDateToFormat, isValidUrl } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    news?: NewsType;
    rootRouter: string;
    className?: string;
}
export const NewsItem = ({ news, rootRouter, className }: Props) => {
    return (
        <Link
            href={`${rootRouter}/${news?.urlPath}`}
            key={news?.id}
            className={`group grid w-full flex-shrink-0 cursor-pointer snap-start grid-cols-12 gap-3 ${className} `}
        >
            <div className="relative col-span-12 aspect-[4/3] overflow-hidden rounded-2xl bg-white dark:bg-gray-800">
                {news?.avatar ? (
                    <Image
                        src={isValidUrl(news.avatar) ? news.avatar : 'https://placehold.co/600x400'}
                        alt={news?.title}
                        fill
                        className="rounded-2xl object-cover duration-500 group-hover:scale-105"
                    />
                ) : null}
            </div>
            <div className="col-span-12 flex flex-col gap-2">
                {news?.datePosted && (
                    <span className="line-clamp-1 text-sm text-[#2C2C2C] dark:text-gray-400">
                        {convertDateToFormat(news.datePosted) || 'Chưa có ngày'}
                    </span>
                )}
                <span className="line-clamp-2 font-bold text-[#2C2C2C] group-hover:text-[#CC0000] dark:text-white dark:group-hover:text-[#FF4D4D]">
                    {news?.title}
                </span>
            </div>
        </Link>
    );
};
