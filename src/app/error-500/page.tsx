'use client';

import ButtonRed from '@/components/common/ButtonRed';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Component con chứa logic sử dụng useSearchParams
function ErrorContent() {
    const [errorText, setErrorText] = useState({
        title: '500 Lỗi máy chủ',
        message: 'Đã xảy ra lỗi với máy chủ. Vui lòng thử lại sau.',
        button: 'Về trang chủ',
    });

    const searchParams = useSearchParams();
    const lang = searchParams.get('lang') || 'vi';

    useEffect(() => {
        if (lang === 'en') {
            setErrorText({
                title: '500 Server Error',
                message: 'An error occurred on our server. Please try again later.',
                button: 'Back to Home',
            });
        } else {
            setErrorText({
                title: '500 Lỗi máy chủ',
                message: 'Đã xảy ra lỗi với máy chủ. Vui lòng thử lại sau.',
                button: 'Về trang chủ',
            });
        }
    }, [lang]);

    return (
        <div className="h-screen w-full max-md:flex max-md:flex-col md:grid md:grid-cols-12">
            <div className="flex flex-col justify-center gap-10 text-start md:col-span-7">
                <div className="flex flex-col gap-5">
                    <h1 className="text-[30px] leading-[100%] font-bold tracking-[0%] md:text-[36px] lg:text-[48px]">
                        {errorText.title}
                    </h1>
                    <h2 className="text-base leading-[150%] font-normal tracking-[0%] md:text-[24px]">
                        {errorText.message}
                    </h2>
                </div>
                <div className="flex w-fit gap-4">
                    <Link href="/" className="w-full">
                        <ButtonRed className="px-8 py-3 text-xl text-[16px] md:font-bold">
                            <div>{errorText.button}</div>
                        </ButtonRed>
                    </Link>
                </div>
            </div>
            <div className="order-first flex items-center justify-center md:order-last md:col-span-5">
                <Image
                    src="/images/error-500.svg"
                    alt="Server Error"
                    width={400}
                    height={300}
                    className="mx-auto h-auto w-full max-w-md"
                />
            </div>
        </div>
    );
}

// Component chính bọc Suspense
export default function StandaloneError500Page() {
    return (
        <main className="container">
            <Suspense fallback={<div>Loading...</div>}>
                <ErrorContent />
            </Suspense>
        </main>
    );
}