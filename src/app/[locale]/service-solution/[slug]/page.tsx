import { ServiceSolutionDetailClient } from '@/components/service-solution/ServiceSolutionDetailClient';
import { serviceSolutionService } from '@/services/serviceConclusionService';
import { Locale } from '@/types/common';
import { ServiceSolutionType } from '@/types/service-solution';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface ServiceSolutionsPageProps {
    params: Promise<{ slug: string; locale: Locale }>;
}

// Hàm lấy dữ liệu bài viết chi tiết
async function fetchServiceSolutionDetail(
    slug: string,
    locale: Locale
): Promise<ServiceSolutionType | null> {
    try {
        const serviceSolution = await serviceSolutionService.getServiceSolutionDetail(slug, locale);
        return serviceSolution;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Hàm generateMetadata để tạo metadata động
export async function generateMetadata({ params }: ServiceSolutionsPageProps): Promise<Metadata> {
    const { slug, locale } = await params;
    const serviceSolution = await fetchServiceSolutionDetail(slug, locale);

    if (!serviceSolution) {
        return {
            title: 'Bài viết không tồn tại',
            description: 'Không tìm thấy bài viết',
        };
    }

    return {
        title: serviceSolution.name,
        description: serviceSolution.shortDescription || serviceSolution.description.slice(0, 160),
        openGraph: {
            title: serviceSolution.name,
            description:
                serviceSolution.shortDescription || serviceSolution.description.slice(0, 160),
            url: `https://katech.vn/${locale}/service-solution/${slug}`,
            images: [
                {
                    url: serviceSolution.thumbnailUrl || 'https://www.katech.vn/images/logo.png',
                    width: 1200,
                    height: 630,
                    alt: serviceSolution.name,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: serviceSolution.name,
            description:
                serviceSolution.shortDescription || serviceSolution.description.slice(0, 160),
            images: [serviceSolution.thumbnailUrl || 'https://www.katech.vn/images/logo.png'],
        },
    };
}

// Trang chính
export default async function ServiceSolutionDetail({ params }: ServiceSolutionsPageProps) {
    const { slug, locale } = await params;
    const serviceSolution = await fetchServiceSolutionDetail(slug, locale);

    if (!serviceSolution) {
        notFound();
    }

    return <ServiceSolutionDetailClient serviceSolution={serviceSolution} locale={locale} />;
}
