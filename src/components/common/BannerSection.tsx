'use client';
import { useMemo } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { BannerType } from '@/types/static-content';
import { isVideo } from '@/utils';

type Props = {
    banner: BannerType | null;
};

const BannerSection = ({ banner }: Props) => {
    // Kiểm tra có nhiều hơn 1 media không
    const hasMultipleImages = banner?.media.length && banner?.media.length > 1;

    // Tạo options cho Swiper nếu có nhiều media
    const swiperOptions = useMemo(
        () => ({
            loop: Boolean(hasMultipleImages && banner?.transitionTime > 0),
            autoplay:
                hasMultipleImages && banner?.transitionTime > 0
                    ? { delay: (banner.transitionTime || 0) * 1000, disableOnInteraction: false }
                    : false,
            pagination: hasMultipleImages ? { clickable: true } : false,
            modules: [Autoplay, Pagination],
        }),
        [banner, hasMultipleImages]
    );

    // Render media item (ảnh hoặc video)
    const renderMediaItem = (item: any, index: number) => {
        if (!item.fileLink) return null;

        if (isVideo(item.fileLink)) {
            return (
                <video
                    src={item.fileLink}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                    controls={false}
                />
            );
        } else {
            return (
                <Image
                    src={item.fileLink}
                    alt={item.altText || `Banner ${index + 1}`}
                    fill
                    className="object-cover"
                />
            );
        }
    };

    return (
        <div className="relative h-full w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            {hasMultipleImages ? (
                <Swiper {...swiperOptions} className="h-full w-full">
                    {banner.media.map((item, index) =>
                        item.fileLink ? (
                            <SwiperSlide key={item.id || `banner-${index}`}>
                                {renderMediaItem(item, index)}
                            </SwiperSlide>
                        ) : null
                    )}
                </Swiper>
            ) : banner?.media[0]?.fileLink ? (
                renderMediaItem(banner.media[0], 0)
            ) : null}
        </div>
    );
};

export default BannerSection;
