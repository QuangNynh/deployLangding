'use client';

import { useTranslation } from 'react-i18next';
import ButtonRed from '../common/ButtonRed';
import { SkeletonCard } from './SkeletonCard';
import Link from 'next/link';
import { getRoute } from '@/utils/routes';
import { useParams } from 'next/navigation';
import { Locale } from '@/types/common';
import EmptyData from '../common/EmptyData';

type Card = {
    id: string;
    recruitmentTitle: string;
    experience: string;
    urlPath: string;
};
interface CardsProps {
    cards: Card[];
    isLoading?: boolean;
}
export const RecruitmentCards = ({ cards, isLoading }: CardsProps) => {
    const { t } = useTranslation('recruitment');
    const params = useParams<{ locale: Locale }>();

    if (isLoading) {
        return (
            <div className="grid grid-cols-3 gap-9 max-xl:gap-x-8 max-xl:gap-y-4 max-sm:grid-cols-1 max-sm:gap-6">
                {[...Array(6)].map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        );
    }
    return (
        <>
            {cards.length === 0 ? (
                <div className="flex w-full items-center justify-center">
                    <EmptyData />
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-9 max-xl:gap-x-8 max-xl:gap-y-4 max-sm:grid-cols-1 max-sm:gap-6">
                    {cards?.map((item: Card) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-start gap-9 rounded-2xl bg-white p-[18px] shadow-lg dark:bg-gray-800 dark:shadow-gray-900"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="line-clamp-1 text-[20px] leading-[150%] font-bold tracking-[0%] dark:text-white">
                                    {item.recruitmentTitle}
                                </div>
                                <div className="line-clamp-1 text-[16px] leading-[150%] font-normal tracking-[0%] dark:text-gray-300">
                                    {item.experience}
                                </div>
                            </div>
                            <Link
                                href={`${getRoute('recruitment', params.locale)}/${item.urlPath}`}
                                className="max-xl:w-full"
                            >
                                <ButtonRed className="px-5 py-[10px]">
                                    <div className="flex items-center gap-2 text-base">
                                        {t('button-card')}
                                    </div>
                                </ButtonRed>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
