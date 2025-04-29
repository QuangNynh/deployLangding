'use client';
import ConanIcon from '@/assets/icons/conan-icon';
import ButtonRed from '../common/ButtonRed';
import { useTranslation } from 'react-i18next';
import ButtonNoBg from '../common/ButtonNoBg';
import { useParams } from 'next/navigation';
import { Locale } from '@/types/common';
import Link from 'next/link';
import { getRoute } from '@/utils/routes';

export const IntroduceSection = () => {
    const { t } = useTranslation('case-study');
    const params = useParams<{ slug: string; locale: Locale }>();
    return (
        <>
            <div className="grid py-10 md:grid-cols-12 dark:bg-gray-900">
                <div className="flex flex-col justify-center gap-10 md:col-span-7">
                    <div className="flex flex-col gap-5">
                        <p className="text-3xl leading-[120%] font-bold md:text-4xl lg:text-5xl dark:text-white">
                            {t('introduce-section.title')}
                        </p>
                        <p className="text-lg leading-[150%] font-normal tracking-normal text-[#2C2C2C] max-md:text-center md:text-xl lg:text-2xl dark:text-gray-300">
                            {t('introduce-section.content')}
                        </p>
                    </div>
                    <div className="flex w-full gap-5 max-lg:items-center max-md:flex-col md:gap-10">
                        <Link className="w-fit" href={getRoute('contact', params.locale)}>
                            <ButtonRed className="px-8 py-3 whitespace-nowrap">
                                <p>{t('introduce-section.button-demo')}</p>
                            </ButtonRed>
                        </Link>
                        <Link className="w-fit" href={getRoute('contact', params.locale)}>
                            <ButtonNoBg className="px-8 py-3 whitespace-nowrap dark:border-white dark:text-white">
                                <p>{t('introduce-section.button-contact')}</p>
                            </ButtonNoBg>
                        </Link>
                    </div>
                </div>
                <div className="order-first flex items-center justify-center md:order-last md:col-span-5">
                    <ConanIcon className="w-[80%] scale-x-[-1] dark:fill-current dark:text-red-500" />
                </div>
            </div>
        </>
    );
};
