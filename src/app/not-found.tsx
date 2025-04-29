'use client';

import Image404 from '@/assets/images/404-image';
import ButtonRed from '@/components/common/ButtonRed';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NotFound = () => {
    const pathname = usePathname();
    const isEnglish = pathname?.startsWith('/en');

    return (
        <main className="container">
            <div className="h-screen w-full max-md:flex max-md:flex-col md:grid md:grid-cols-12">
                <div className="flex flex-col justify-center gap-10 text-start md:col-span-7">
                    <div className="flex flex-col gap-5">
                        <h1 className="text-[30px] leading-[100%] font-bold tracking-[0%] md:text-[36px] lg:text-[48px]">
                            {isEnglish ? '404 Page Not Found' : '404 Không tìm thấy trang'}
                        </h1>
                        <h2 className="!text-base leading-[150%] font-normal tracking-[0%] max-md:hidden md:!text-[24px]">
                            {isEnglish
                                ? 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
                                : 'Trang bạn đang tìm kiếm có thể đã bị xóa, đã thay đổi tên, hoặc tạm thời không khả dụng.'}
                        </h2>
                    </div>
                    <div className="flex w-fit">
                        <Link href={isEnglish ? '/en' : '/'} className="w-full">
                            <ButtonRed className="px-8 py-3 text-xl text-[16px] md:font-bold">
                                <div>{isEnglish ? 'Back to Home' : 'Về trang chủ'}</div>
                            </ButtonRed>
                        </Link>
                    </div>
                </div>
                <div className="order-first flex items-center justify-center md:order-last md:col-span-5">
                    <Image404 />
                </div>
            </div>
        </main>
    );
};

export default NotFound;
