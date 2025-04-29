import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { newsService } from '@/services/newsService';
import { NewsDetailClient } from '@/components/news/NewsDetailClient';
import { Locale } from '@/types/common';
import { NewsType } from '@/types/news';

// Define the props type explicitly
interface NewsPageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

// Hàm lấy dữ liệu bài viết chi tiết
async function fetchNewsDetail(slug: string, locale: Locale): Promise<NewsType | null> {
  try {
    const news = await newsService.getNewsDetail(slug, locale);
    return news;
  } catch (error) {
    console.error('Error fetching news detail:', error); // Consider using a logging service in production
    return null;
  }
}

// Hàm generateMetadata để tạo metadata động
export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const news = await fetchNewsDetail(slug, locale);
  const headersList = headers();
  const host = (await headersList).get('x-forwarded-host') || (await headersList).get('host'); // Fallback to host if x-forwarded-host is unavailable
  const protocol = 'https';
  const baseUrl = `${protocol}://${host}`;
  const pageUrl = `${baseUrl}/news/${slug}`;

  if (!news) {
    return {
      title: 'Bài viết không tồn tại',
      description: 'Không tìm thấy bài viết',
    };
  }

  return {
    title: news.title,
    description: news.shortDescription || news.content.slice(0, 160),
    openGraph: {
      title: news.title,
      description: news.shortDescription || news.content.slice(0, 160),
      url: pageUrl,
      images: [
        {
          url: news.urlBanner || (process.env.NEXT_PUBLIC_LOGO_URL as string),
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: news.title,
      description: news.shortDescription || news.content.slice(0, 160),
      images: [news.urlBanner || (process.env.NEXT_PUBLIC_LOGO_URL as string)],
    },
  };
}

// Trang chính
export default async function PostDetail({ params }: NewsPageProps) {
  const { slug, locale } = await params; // Await the params Promise
  const news = await fetchNewsDetail(slug, locale);

  if (!news) {
    notFound();
  }

  return <NewsDetailClient news={news} locale={locale} />;
}