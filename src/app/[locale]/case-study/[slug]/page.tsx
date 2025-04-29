import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { caseStudyService } from '@/services/caseStudyService';
import { CaseStudyDetailClient } from '@/components/case-study/CaseStudyDetailClient';
import { Locale } from '@/types/common';
import { CaseStudyType } from '@/types/case-study';

// Define the props type explicitly
interface CaseStudyPageProps {
  params: Promise<{ slug: string; locale: Locale }>; 
}

// Hàm lấy dữ liệu bài viết chi tiết
async function fetchCaseStudyDetail(
  slug: string,
  locale: Locale
): Promise<CaseStudyType | null> {
  try {
    const caseStudy = await caseStudyService.getCaseStudyDetail(slug, locale);
    return caseStudy;
  } catch (error) {
    console.error('Error fetching case study detail:', error);
    return null;
  }
}

// Hàm generateMetadata để tạo metadata động
export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug, locale } = await params; // Await the params Promise
  const caseStudy = await fetchCaseStudyDetail(slug, locale);
  const headersList = headers();
  const host = (await headersList).get('x-forwarded-host') || (await headersList).get('host');
  const protocol = 'https';
  const baseUrl = `${protocol}://${host}`;
  const pageUrl = `${baseUrl}/case-study/${slug}`;

  if (!caseStudy) {
    return {
      title: 'Bài viết không tồn tại',
      description: 'Không tìm thấy bài viết',
    };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.shortDescription || caseStudy.description.slice(0, 160),
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.shortDescription || caseStudy.description.slice(0, 160),
      url: pageUrl,
      images: [
        {
          url: caseStudy.urlBanner || (process.env.NEXT_PUBLIC_LOGO_URL as string),
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.title,
      description: caseStudy.shortDescription || caseStudy.description.slice(0, 160),
      images: [caseStudy.urlBanner || (process.env.NEXT_PUBLIC_LOGO_URL as string)],
    },
  };
}

// Trang chính
export default async function CaseStudyDetail({ params }: CaseStudyPageProps) {
  const { slug, locale } = await params;
  const caseStudy = await fetchCaseStudyDetail(slug, locale);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetailClient caseStudy={caseStudy} locale={locale} />;
}