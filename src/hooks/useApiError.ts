import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useApiError = (error: unknown, redirectTo500: boolean = true) => {
  const router = useRouter();

  useEffect(() => {
    if (error && redirectTo500) {
      console.error('API Error:', error);
      router.push('/error-500');
    }
  }, [error, router, redirectTo500]);

  return { error };
}; 