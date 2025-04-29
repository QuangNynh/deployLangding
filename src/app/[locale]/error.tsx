'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
                                  error,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        console.error('Application error:', error);

        // Determine the language based on user preferences or fallback to default
        const lang = navigator.language.includes('en') ? 'en' : 'vi';

        // Redirect to the standalone error page with the lang query parameter
        router.push(`/error-500?lang=${lang}`);
    }, [error, router]);

    // Return null as we're redirecting
    return null;
}