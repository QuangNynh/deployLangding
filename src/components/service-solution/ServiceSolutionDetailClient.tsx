'use client';

import { RelatedNewsSection } from '@/components/news/RelatedNewsSection';
import NewsDetailSection from '@/components/news/NewsDetailSection';
import { serviceSolutionService } from '@/services/serviceConclusionService';
import { Locale } from '@/types/common';
import { getRoute } from '@/utils/routes';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { ServiceSolutionType } from '@/types/service-solution';
import { NewsType } from '@/types/news';

// Hook để lấy danh sách bài viết liên quan
const useRelatedNews = (urlPath: string | undefined, locale: Locale) => {
  return useQuery({
    queryKey: ['service-solution-related', urlPath],
    queryFn: () => serviceSolutionService.getServiceSolutionRelated(urlPath || '', locale),
  });
};

interface ServiceSolutionDetailClientProps {
  serviceSolution: ServiceSolutionType; // Dữ liệu bài viết chi tiết từ props
  locale: Locale;
}

export function ServiceSolutionDetailClient({
  serviceSolution,
  locale,
}: ServiceSolutionDetailClientProps) {
  const { t } = useTranslation('news');

  // Gọi hook cho bài viết liên quan
  const { data: responseServiceSolutionRelated, isLoading: isLoadingRelated } = useRelatedNews(
    serviceSolution.urlSlug,
    locale
  );

  const serviceSolutionRelated: NewsType[] =
    responseServiceSolutionRelated?.content?.map((item: any) => ({
      id: item.id,
      title: item.name,
      content: item.description,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      datePosted: item.updatedAt ?? null,
      source: item.source ?? null,
      writer: item.writer ?? null,
      status: item.status,
      category: item.category,
      card: item.card ?? [],
      shortDescription: item.shortDescription,
      avatar: item.thumbnailUrl,
      type: item.type,
      metaDescription: item.metaDescription,
      urlPath: item.urlSlug,
      urlBanner: item.urlBanner,
    })) ?? [];

  return (
    <section>
      <div className="container">
        {/* Ảnh nền và tiêu đề */}
        <div className="py-6">
          <div
            className={`relative aspect-[3/5] w-full overflow-hidden rounded-[28px] ${
              !serviceSolution.urlBanner && 'animate-pulse bg-gray-200'
            } md:aspect-video lg:aspect-[4/1]`}
          >
            {!serviceSolution.urlBanner ? (
              <div className="h-full w-full bg-gray-300"></div>
            ) : (
              <Image
                src={serviceSolution.urlBanner}
                alt={serviceSolution.urlSlug || 'default-alt'}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute top-0 left-0 z-10 flex h-full w-full flex-col justify-end gap-4 p-8">
              <h2 className="text-5xl font-bold text-white">{serviceSolution.name}</h2>
              <p className="text-[#FAF8F8]">{serviceSolution.shortDescription}</p>
            </div>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="grid grid-cols-12 lg:gap-12">
          <div className="col-span-12 py-6 lg:col-span-8">
            <NewsDetailSection content={serviceSolution.description} />
          </div>
          <div className="col-span-12 py-6 lg:col-span-4">
            <div className="flex flex-col gap-4">
              <span className="text-[28px] leading-6 font-bold">{t('related-news.title')}</span>
              <RelatedNewsSection
                data={serviceSolutionRelated}
                rootRouter={getRoute('service-solution', locale)}
                isLoading={isLoadingRelated}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}