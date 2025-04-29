/* eslint-disable @next/next/no-img-element */
'use client';

import { RelatedNewsSection } from '@/components/news/RelatedNewsSection';
import { newsService } from '@/services/newsService';
import { Locale } from '@/types/common';
import { getRoute } from '@/utils/routes';
import { useQuery } from '@tanstack/react-query';
import AOS from 'aos';
import { useEffect } from 'react';
import { useApiError } from '@/hooks/useApiError';
import NewsDetailSection from '@/components/news/NewsDetailSection';
import { useTranslation } from 'react-i18next';
import { NewsResponse, NewsType } from '@/types/news';

// Hook để lấy danh sách bài viết liên quan
const useRelatedNews = (
  cards: string[] | undefined,
  urlPath: string | undefined,
  locale: Locale
) => {
  return useQuery<NewsResponse>({
    queryKey: ['news-related', cards, urlPath],
    queryFn: () => newsService.getNewsRelated(cards || [], urlPath || '', locale),
    enabled: !!cards?.length,
    retry: 1,
  });
};

interface NewsDetailClientProps {
  news: NewsType; // Nhận dữ liệu bài viết từ props
  locale: Locale;
}

export function NewsDetailClient({ news, locale }: NewsDetailClientProps) {
  const { t } = useTranslation('news');

  // Gọi hook cho bài viết liên quan
  const {
    data: responseNewsRelated,
    isLoading: isLoadingRelated,
    error: relatedNewsError,
  } = useRelatedNews(news.card, news.urlPath, locale);

  // Xử lý lỗi API cho bài viết liên quan
  useApiError(relatedNewsError);

  const newsRelated: NewsType[] = responseNewsRelated?.content ?? [];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <section className="dark:bg-gray-900">
      <div className="container">
        {/* Ảnh nền và tiêu đề */}
        <div className="py-6">
          <div
            className={`relative aspect-[3/4] w-full overflow-hidden rounded-[28px] ${
              !news.urlBanner && 'animate-pulse bg-gray-200 dark:bg-gray-700'
            } md:aspect-video lg:aspect-[56/15]`}
          >
            {!news.urlBanner ? (
              <div className="h-full w-full bg-gray-300 dark:bg-gray-700"></div>
            ) : (
              <img
                src={news.urlBanner}
                alt={news.urlPath || 'default-alt'}
                className="h-full w-full"
              />
            )}
            <div className="absolute top-0 left-0 z-10 flex h-full w-full flex-col justify-end">
              <div className="flex flex-col justify-end gap-4 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0)] p-8">
                <h2 className="text-5xl leading-[120%] font-bold text-white">{news.title}</h2>
                <p className="text-[#FAF8F8]">{news.shortDescription}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="grid grid-cols-12 lg:gap-12">
          <div className="col-span-12 py-6 lg:col-span-8">
            <NewsDetailSection content={news.content} />
          </div>
          <div className="col-span-12 py-6 lg:col-span-4">
            <div className="flex flex-col gap-4">
              <span className="text-[28px] leading-6 font-bold dark:text-white">
                {t('related-news.title')}
              </span>
              <RelatedNewsSection
                data={newsRelated}
                rootRouter={getRoute('news', locale)}
                isLoading={isLoadingRelated}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}