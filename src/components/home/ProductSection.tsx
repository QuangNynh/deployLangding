'use client';

import { productService } from '@/services/productService';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ButtonRed from '../common/ButtonRed';
import { useParams } from 'next/navigation';
import { Locale } from '@/types/common';

interface ProductTypeProps {
    name: string;
    description: string;
    imageLink: string;
    productLink: string;
}

const Product = ({ name, description, imageLink, productLink }: ProductTypeProps) => {
    const { t } = useTranslation('home');
    return (
        <div className="md:px-none grid items-center gap-8 py-[52px] md:grid-cols-2 lg:gap-[96px] lg:px-24 dark:bg-gray-900">
            <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden">
                {imageLink && <img src={imageLink} alt={name} className="object-contain" />}
            </div>
            <div className="flex flex-col justify-center lg:items-end">
                <div className="flex flex-col gap-10 max-md:gap-8 lg:w-[80%]">
                    <p className="text-5xl font-bold max-md:text-3xl dark:text-white">{name}</p>
                    <p className="text-base font-normal md:text-xl lg:text-2xl dark:text-gray-300">
                        {description}
                    </p>
                    <div className="flex w-full max-md:justify-center">
                        <Link href={productLink ? productLink : '/'} target="_blank">
                            <ButtonRed className="px-8 py-3 text-base md:text-xl">
                                <p>{t('product-section.button')}</p>
                            </ButtonRed>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ProductSection = () => {
    const params = useParams<{ slug: string; locale: Locale }>();
    const { data: dataProduct } = useQuery({
        queryKey: ['products'],
        queryFn: () => productService.getProducts(params.locale),
    });

    return (
        <div className="dark:bg-gray-900">
            <div className="container">
                <div className="py-10">
                    <Swiper
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper dark:bg-gray-900"
                    >
                        {dataProduct?.data?.content.map((item: ProductTypeProps, index: number) => (
                            <SwiperSlide key={index} className="dark:bg-gray-900">
                                <Product {...item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};
