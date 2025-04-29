'use client';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ButtonNoBg from '../common/ButtonNoBg';
import { useRouter } from 'next/navigation';

interface CustomersProps {
    title: string;
    content: string;
    button?: string;
    urlImage: string;
    url?: string;
}

const Customers = (data: CustomersProps) => {
    const router = useRouter();

    return (
        <div className="py-10">
            <div className="grid rounded-[22px] bg-white lg:grid-cols-12 dark:bg-gray-800">
                <div className="flex items-center px-2 py-6 lg:col-span-7 lg:px-12">
                    <div className="flex flex-col gap-10 max-lg:text-center">
                        <p className="text-4xl font-bold max-md:text-2xl dark:text-white">
                            {data.title}
                        </p>
                        <p className="text-2xl leading-[150%] font-normal tracking-normal text-[#2C2C2C] max-md:text-sm dark:text-gray-300">
                            {data.content}
                        </p>
                        <div className="flex w-full gap-5 max-lg:flex-col max-lg:items-center lg:gap-10">
                            <div className="w-fit">
                                <ButtonNoBg
                                    className="border-white px-8 py-3 whitespace-nowrap dark:border-gray-600 dark:text-white"
                                    {...(data.url && {
                                        onClick: () => router.push(data?.url as string),
                                    })}
                                >
                                    <p>{data.button}</p>
                                </ButtonNoBg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative order-first aspect-[10/9] lg:order-last lg:col-span-5">
                    <Image
                        src={data.urlImage}
                        alt="img-card"
                        fill
                        objectFit="cover"
                        className="rounded-tr-[22px] max-lg:rounded-tl-[22px] lg:rounded-br-[22px]"
                    />
                </div>
            </div>
        </div>
    );
};

export const CustomersSection: React.FC = () => {
    const { t } = useTranslation('case-study');
    const paginationCustom = {
        clickable: true,
        renderBullet: (index: number, className: string) => {
            return `<span class="${className} custom-pagination"></span>`;
        },
    };

    const dataCustomer: CustomersProps[] = [
        {
            title: t('customer-section.card-1.title'),
            content: t('customer-section.card-1.content'),
            button: t('customer-section.card-1.button'),
            urlImage: t('customer-section.card-1.image'),
            url: t('customer-section.card-1.url'),
        },
        {
            title: t('customer-section.card-2.title'),
            content: t('customer-section.card-2.content'),
            button: t('customer-section.card-2.button'),
            urlImage: t('customer-section.card-2.image'),
        },
        {
            title: t('customer-section.card-3.title'),
            content: t('customer-section.card-3.content'),
            button: t('customer-section.card-3.button'),
            urlImage: t('customer-section.card-3.image'),
        },
    ];

    return (
        <div className="py-10 dark:bg-gray-900">
            <h2 className="text-center !text-[48px] font-bold tracking-normal text-[#fe0000] max-md:!text-2xl dark:text-white">
                {t('customer-section.title')}
            </h2>
            <Swiper
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop
                pagination={paginationCustom}
                modules={[Pagination, Autoplay]}
                className="mySwiper dark:bg-gray-900"
            >
                {dataCustomer.map((item: CustomersProps, index: number) => (
                    <SwiperSlide key={index} className="dark:bg-gray-900">
                        <Customers {...item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
