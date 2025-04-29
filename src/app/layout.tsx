import { QueryProvider } from '@/providers/queryClientProvider';
import '@/styles/globals.css';
import '@/styles/revert.css';
import 'aos/dist/aos.css';
import Script from 'next/script';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Google Tag (gtag.js) */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-FQWF6XTEHE"
                    strategy="beforeInteractive"
                />
                <Script id="google-analytics" strategy="beforeInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FQWF6XTEHE');
          `}
                </Script>
                {/* Fallback meta image */}
                {/* <meta name="image" content="/images/logo.png" /> */}
                {/* Đảm bảo Google index */}
                {/* <meta name="robots" content="index, follow" /> */}
            </head>
            <body>
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
}
