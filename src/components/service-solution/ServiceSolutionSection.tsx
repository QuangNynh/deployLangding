import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Image from 'next/image';
import ButtonRed from '@/components/common/ButtonRed';
import EmptyData from '@/components/common/EmptyData';
import { serviceSolutionService } from '@/services/serviceConclusionService';
import { ServiceSolutionType } from '@/types/service-solution';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { getRoute } from '@/utils/routes';
import { useParams } from 'next/navigation';
import { Locale } from '@/types/common';
import { useEffect } from 'react';
import AOS from 'aos';

const SKELETON_COUNT = 4;

// Skeleton Loader
const ServiceSolutionSkeleton = () => (
    <div className="grid animate-pulse grid-cols-12 overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-800 dark:shadow-gray-900">
        <div className="order-1 col-span-12 aspect-[4/3] w-full bg-gray-300 md:order-2 md:col-span-5 md:aspect-auto lg:order-1 dark:bg-gray-700" />
        <div className="order-2 col-span-12 flex flex-col justify-between gap-10 p-10 md:order-1 md:col-span-7 lg:order-2">
            <div className="flex flex-col gap-3">
                <span className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700" />
                <span className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700" />
                <span className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700" />
                <span className="h-4 w-2/3 rounded bg-gray-300 dark:bg-gray-700" />
            </div>
            <div className="h-10 w-32 rounded-lg bg-gray-300 dark:bg-gray-700" />
        </div>
    </div>
);

// Service Item Component
const ServiceSolutionItem = ({
    item,
    locale,
    index,
}: {
    item: ServiceSolutionType;
    locale: Locale;
    index: number;
}) => {
    const { t } = useTranslation('common');

    return (
        <div
            className="grid grid-cols-12 overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-800 dark:shadow-gray-900"
            data-aos={index % 2 ? 'zoom-in-up' : 'zoom-in-down'}
        >
            <div
                className={`relative order-1 col-span-12 aspect-[4/3] w-full md:col-span-5 md:aspect-auto ${index % 2 ? 'md:order-2 lg:order-1' : ''}`}
            >
                <Image src={item.thumbnailUrl} alt={item.name} fill className="object-cover" />
            </div>
            <div
                className={`order-2 col-span-12 flex flex-col justify-between gap-10 p-10 md:col-span-7 ${index % 2 ? 'md:order-1 lg:order-2' : ''}`}
            >
                <div className="flex flex-col gap-3">
                    <span className="line-clamp-2 text-2xl font-bold dark:text-white">
                        {item.name}
                    </span>
                    <span className="line-clamp-3 text-[20px] dark:text-gray-300">
                        {item.shortDescription}
                    </span>
                </div>
                <Link href={`${getRoute('service-solution', locale)}/${item.urlSlug}`}>
                    <ButtonRed className="w-full py-3">{t('learn-more')}</ButtonRed>
                </Link>
            </div>
        </div>
    );
};

// Main Section
const ServiceConclusionSection = () => {
    const params = useParams<{ slug: string; locale: Locale }>();
    const { t } = useTranslation('service-solution');
    const {
        data: serviceSolutions = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['service-solutions'],
        queryFn: () => serviceSolutionService.getServiceSolutions(params.locale),
    });

    // Show error toast when request fails
    if (error) {
        toast.error(error.message || 'Lỗi tải dữ liệu');
    }
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);
    return (
        <section className="flex flex-col gap-[52px] py-6 md:py-[52px] dark:bg-gray-900">
            <h2 className="text-center !text-[30px] font-bold text-[#fe0000] md:!text-5xl lg:text-left dark:text-white">
                {t('service-solutions-section.title')}
            </h2>

            {/* Loading State */}
            {isLoading ? (
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                    {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                        <ServiceSolutionSkeleton key={index} />
                    ))}
                </div>
            ) : error || serviceSolutions.length === 0 ? (
                <EmptyData />
            ) : (
                /* Data List */
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                    {serviceSolutions?.map((item: ServiceSolutionType, index: number) => (
                        <ServiceSolutionItem
                            key={item.id}
                            item={item}
                            locale={params.locale}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ServiceConclusionSection;
