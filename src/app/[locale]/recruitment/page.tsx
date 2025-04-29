'use client';

import SearchIcon from '@/assets/icons/search';
import Pagination from '@/components/common/Pagination';
import Select from '@/components/common/Select';
import { RecruitmentCards } from '@/components/recruitment/RecruitmentCards';
import { salaryEn, salaryVi } from '@/constants/salary';
import { workTypes } from '@/constants/workTypes';
import { recruitmentService } from '@/services/recruitmentService';
import { Locale } from '@/types/common';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Position {
    id: number;
    positionsName: string;
}

const RecruitmentPage = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const pageSize = 6;
    const [position, setPosition] = useState<number | string>('');
    const [workType, setWorkType] = useState<number | string>('');
    const [valueSalary, setValueSalary] = useState<number | string>('');
    const [searchTitle, setSearchTitle] = useState<string>('');
    const [valueInput, setValueInput] = useState<string>('');
    const { t } = useTranslation('recruitment');
    const { t: tCommon } = useTranslation('common');
    const params = useParams<{ locale: Locale }>();

    const { data: positions } = useQuery({
        queryKey: ['positions'],
        queryFn: () => recruitmentService.getPositions(params.locale),
    });

    const { data: recruitment, isLoading } = useQuery({
        queryKey: ['recruitment', position, workType, valueSalary, searchTitle, pageNumber],
        queryFn: () =>
            recruitmentService.getRecruitment({
                pageNumber: pageNumber - 1,
                pageSize: pageSize,
                position: position === 'ALL' ? '' : position,
                workType: workType === 'ALL' ? '' : workType,
                valueSalary: valueSalary === '0' ? '' : valueSalary,
                searchTitle,
                locale: params.locale,
            }),
    });

    return (
        <section className="dark:bg-gray-900">
            <div className="container">
                <h1 className="py-12 text-center text-5xl !text-[30px] leading-[120%] font-bold md:!text-[48px] lg:px-[42px] dark:text-white">
                    {t('title')}
                </h1>
                <div className="flex flex-col gap-9 py-6">
                    <div className="flex flex-col items-center justify-center gap-4 xl:flex-row xl:justify-between">
                        <div className="flex gap-4 max-lg:w-full max-lg:flex-col">
                            <Select
                                options={[
                                    {
                                        value: 'ALL',
                                        label: t('select-all'),
                                    },
                                    ...(positions?.data?.data?.content
                                        ? positions?.data?.data?.content?.map((item: Position) => ({
                                              value: item.id,
                                              label: item.positionsName,
                                          }))
                                        : []),
                                ]}
                                onChange={(value) => setPosition(value as string | number)}
                                value={position}
                                placeholder={t('position')}
                                className="w-full dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                            <Select
                                options={[{ value: 'ALL', label: t('select-all') }, ...workTypes]}
                                onChange={(value) => setWorkType(value as string | number)}
                                value={workType}
                                placeholder={t('workType')}
                                className="w-full dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                            <Select
                                options={params.locale === 'vi' ? salaryVi : salaryEn}
                                onChange={(value) => setValueSalary(value as string | number)}
                                value={valueSalary}
                                placeholder={t('salary')}
                                className="w-full dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="order-[-1] flex w-1/2 items-center justify-center gap-3 max-md:w-full xl:order-[1] xl:w-1/3">
                            <input
                                onChange={(e) => setValueInput(e.target.value)}
                                value={valueInput}
                                onKeyDown={(e) =>
                                    e.key === 'Enter' && valueInput && setSearchTitle(valueInput)
                                }
                                type="text"
                                placeholder={tCommon('search')}
                                className="w-full rounded-full border border-gray-300 px-4 py-2.5 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                            />
                            <div
                                className="cursor-pointer rounded-full bg-gradient-to-r from-[#FF4D4D] to-[#CC0000] p-3 text-white"
                                onClick={() => setSearchTitle(valueInput)}
                            >
                                <SearchIcon className="dark:text-white" />
                            </div>
                        </div>
                    </div>
                    <RecruitmentCards
                        cards={recruitment?.data?.data?.content}
                        isLoading={isLoading}
                    />
                    <div>
                        {recruitment?.data?.data?.content.length > 0 && (
                            <Pagination
                                currentPage={pageNumber}
                                totalPages={Math.ceil(
                                    (recruitment?.data?.data?.totalElements || 0) / pageSize
                                )}
                                onPageChange={setPageNumber}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecruitmentPage;
