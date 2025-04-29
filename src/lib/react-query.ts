import { QueryClient } from "@tanstack/react-query";

// Tạo instance của QueryClient với cấu hình mặc định
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Thời gian dữ liệu được coi là "fresh" (mặc định: 0)
      staleTime: 5 * 1000, // 5 giây
      // Thời gian lưu cache (mặc định: 5 phút)
      gcTime: 10 * 60 * 1000, // 10 phút
      // Tự động refetch khi window focus (mặc định: true)
      refetchOnWindowFocus: true,
      // Số lần retry khi lỗi (mặc định: 3)
      retry: 2,
    },
  },
});
