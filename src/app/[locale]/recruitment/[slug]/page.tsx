'use client';
import NewsDetailSection from '@/components/news/NewsDetailSection';
import { SALARY } from '@/constants/salary';
import { WORK_TYPE } from '@/constants/workTypes';
import { recruitmentService } from '@/services/recruitmentService';
import { Locale } from '@/types/common';
import { RecruitmentType } from '@/types/recruitment';
import { convertDateToFormat } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useRecruitmentDetail = (slug: string, locale: Locale) => {
    return useQuery<RecruitmentType>({
        queryKey: ['news-detail', slug],
        queryFn: () => recruitmentService.getRecruitmentDetail(slug, locale),
    });
};

const RecruitmentDetail = () => {
    const { t } = useTranslation('recruitment-detail');
    const params = useParams<{ slug: string; locale: Locale }>();
    const { data: recruitmentDetail } = useRecruitmentDetail(params.slug, params.locale);

    return (
        <section className="py-6 dark:bg-gray-900">
            <div className="container">
                <div className="mx-auto max-w-4xl">
                    <div className="flex flex-col items-center">
                        <h2 className="!mb-10 !text-[28px] font-extrabold dark:text-white">
                            {recruitmentDetail?.recruitmentTitle}
                        </h2>
                        <div className="flex w-full flex-col gap-6 md:gap-10">
                            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                                <div className="flex flex-col gap-2 px-4">
                                    <span className="text-lg dark:text-gray-300">
                                        {t('workType')}
                                    </span>
                                    <span className="text-lg font-bold uppercase dark:text-white">
                                        {
                                            WORK_TYPE[
                                                recruitmentDetail?.typesOfWork as keyof typeof WORK_TYPE
                                            ]
                                        }
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2 border-[#CC0000] px-4 md:items-center md:border-x-2 dark:border-[#FF4D4D]">
                                    <span className="text-lg dark:text-gray-300">
                                        {t('experience')}
                                    </span>
                                    <span className="text-lg font-bold uppercase md:text-center dark:text-white">
                                        {recruitmentDetail?.experience}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2 px-4 md:items-end">
                                    <span className="text-lg dark:text-gray-300">
                                        {t('salary')}
                                    </span>
                                    <span className="text-lg font-bold uppercase dark:text-white">
                                        {
                                            SALARY[params.locale][
                                                recruitmentDetail?.salaryRange as keyof typeof SALARY.vi
                                            ]
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                                <div className="flex flex-col gap-2 px-4">
                                    <span className="text-lg dark:text-gray-300">
                                        {t('position')}
                                    </span>
                                    <span className="text-lg font-bold uppercase dark:text-white">
                                        {recruitmentDetail?.position}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2 border-[#CC0000] px-4 md:items-center md:border-x-2 dark:border-[#FF4D4D]">
                                    <span className="text-lg dark:text-gray-300">
                                        {t('deadline')}
                                    </span>
                                    <span className="text-lg font-bold uppercase md:text-center dark:text-white">
                                        {convertDateToFormat(
                                            recruitmentDetail?.expirationDate as string
                                        )}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2 px-4 md:items-end">
                                    <span className="text-lg dark:text-gray-300">
                                        {t('quantity')}
                                    </span>
                                    <span className="text-lg font-bold uppercase dark:text-white">
                                        {recruitmentDetail?.quantity}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 px-3 py-6 lg:col-span-8 lg:mt-20 lg:py-12">
                    {recruitmentDetail?.content ? (
                        <NewsDetailSection content={recruitmentDetail.content} isShowToc={false} />
                    ) : (
                        <div className="space-y-4">
                            <div className="h-6 w-full animate-pulse rounded-md bg-gray-300 dark:bg-gray-700"></div>
                            <div className="h-6 w-full animate-pulse rounded-md bg-gray-300 dark:bg-gray-700"></div>
                            <div className="h-6 w-3/4 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RecruitmentDetail;
