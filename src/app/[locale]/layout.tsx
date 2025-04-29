import Footer from '@/layout/Footer';
import { Header } from '@/layout/Header';
import I18nProvider from '@/providers/i18nProvider';
import { ToastContainer } from 'react-toastify';
import OfflineDetector from '@/components/common/OfflineDetector';
import ServiceWorker from '@/components/common/ServiceWorker';
import ChatBot from '@/layout/ChatBot';
import { Metadata } from 'next';
import { Locale } from '@/types/common';

interface Props {
    params: Promise<{ slug: string; locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isEnglish = locale === 'en';

    return {
        title: isEnglish ? 'Katech - Vietnam' : 'Katech - Việt Nam',
        description: isEnglish
            ? 'Not just technology, we deliver value Technology solutions for a smarter tomorrow'
            : 'Không chỉ công nghệ, chúng tôi mang lại giá trị Giải pháp công nghệ cho một ngày mai thông minh hơn.',
        icons: [
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                url: '/favicon/favicon-32x32.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                url: '/favicon/favicon-16x16.png',
            },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                url: '/favicon/apple-touch-icon.png',
            },
        ],
        openGraph: {
            title: isEnglish ? 'Katech - Vietnam' : 'Katech - Việt Nam',
            description: isEnglish
                ? 'Not just technology, we deliver value Technology solutions for a smarter tomorrow'
                : 'Không chỉ công nghệ, chúng tôi mang lại giá trị Giải pháp công nghệ cho một ngày mai thông minh hơn.',
            url: 'https://www.katech.vn',
            siteName: isEnglish ? 'Katech - Vietnam' : 'Katech - Việt Nam',
            images: [
                {
                    url: 'https://www.katech.vn/images/logo.png',
                    width: 1200,
                    height: 630,
                    alt: isEnglish ? 'Katech - Vietnam' : 'Katech - Việt Nam',
                },
            ],
            locale: isEnglish ? 'en_US' : 'vi_VN',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: isEnglish ? 'Katech - Vietnam' : 'Katech - Việt Nam',
            description: isEnglish
                ? 'Not just technology, we deliver value Technology solutions for a smarter tomorrow'
                : 'Không chỉ công nghệ, chúng tôi mang lại giá trị Giải pháp công nghệ cho một ngày mai thông minh hơn.',
            images: ['https://www.katech.vn/images/logo.png'],
        },
    };
}

export default function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    return (
        <I18nProvider params={params}>
            <ServiceWorker />
            <OfflineDetector />
            <Header />
            {children}
            <ChatBot />
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </I18nProvider>
    );
}
