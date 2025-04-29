'use client';

import NewsDetailSection from '@/components/news/NewsDetailSection';
import { RelatedNewsSection } from '@/components/news/RelatedNewsSection';
import { caseStudyService } from '@/services/caseStudyService';
import {Locale } from '@/types/common';
import { getRoute } from '@/utils/routes';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useApiError } from '@/hooks/useApiError';
import { CaseStudyType } from '@/types/case-study';
import { NewsType } from '@/types/news';

// Hook để lấy danh sách bài viết liên quan
const useRelatedNews = (urlPath: string | undefined, tags: string[] = [], locale: Locale) => {
  return useQuery({
    queryKey: ['case-study-related', urlPath, tags],
    queryFn: () => caseStudyService.getCaseStudyRelated(urlPath || '', tags, locale),
    enabled: !!urlPath && tags.length > 0, // Chỉ gọi khi có urlPath và tags
  });
};

interface CaseStudyDetailClientProps {
  caseStudy: CaseStudyType; // Dữ liệu bài viết chi tiết từ props
  locale: Locale;
}

export function CaseStudyDetailClient({ caseStudy, locale }: CaseStudyDetailClientProps) {
  const { t } = useTranslation('news');

  // Gọi hook cho bài viết liên quan
  const { data: responseCaseStudyRelated, isLoading: isLoadingRelated, error } = useRelatedNews(
    caseStudy.urlSlug,
    caseStudy.tags,
    locale
  );
  useApiError(error); // Xử lý lỗi API

  const caseStudyRelated: NewsType[] =
    responseCaseStudyRelated?.content?.map((item: any) => ({
      id: item.id,
      title: item.title,
      content: item.description,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      datePosted: item.updatedAt ?? null,
      source: item.source ?? null,
      writer: item.writer ?? null,
      status: item.status,
      category: item.category,
      card: item.tags ?? [],
      shortDescription: item.shortDescription,
      avatar: item.thumbnailUrl,
      type: item.type,
      metaDescription: item.metaDescription,
      urlPath: item.urlSlug,
      urlBanner: item.urlBanner,
    })) ?? [];

  return (
    <section className="dark:bg-gray-900">
      <div className="container">
        {/* Ảnh nền và tiêu đề */}
        <div className="py-6">
          <div
            className={`relative aspect-[3/4] w-full overflow-hidden rounded-[28px] ${
              !caseStudy.urlBanner && 'animate-pulse bg-gray-200 dark:bg-gray-700'
            } md:aspect-video lg:aspect-[4/1]`}
          >
            {!caseStudy.urlBanner ? (
              <div className="h-full w-full bg-gray-300 dark:bg-gray-700"></div>
            ) : (
              <Image
                src={caseStudy.urlBanner}
                alt={caseStudy.urlSlug || 'default-alt'}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute top-0 left-0 z-10 flex h-full w-full flex-col justify-end">
              <div className="flex flex-col justify-end gap-4 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0)] p-8">
                <h2 className="text-5xl font-bold text-white">{caseStudy.title}</h2>
                <p className="text-[#FAF8F8]">{caseStudy.shortDescription}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="grid grid-cols-12 lg:gap-12">
          <div className="col-span-12 py-6 lg:col-span-8">
            <NewsDetailSection content={caseStudy.description} />
          </div>
          <div className="col-span-12 py-6 lg:col-span-4">
            <div className="flex flex-col gap-4">
              <span className="text-[28px] leading-6 font-bold dark:text-white">
                {t('related-news.title')}
              </span>
              <RelatedNewsSection
                data={caseStudyRelated}
                rootRouter={getRoute('case-study', locale)}
                isLoading={isLoadingRelated}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}