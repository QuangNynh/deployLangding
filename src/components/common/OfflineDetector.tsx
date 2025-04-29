'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const OfflineDetector = () => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // Kiểm tra trạng thái kết nối ban đầu
        setIsOnline(navigator.onLine);

        // Xử lý sự kiện khi mất kết nối
        const handleOffline = () => {
            setIsOnline(false);
            toast.error('Mất kết nối mạng! Một số tính năng có thể không hoạt động.', {
                autoClose: 5000,
            });
        };

        // Xử lý sự kiện khi có kết nối trở lại
        const handleOnline = () => {
            setIsOnline(true);
            toast.success('Đã kết nối lại!', {
                autoClose: 3000,
            });
        };

        // Đăng ký các sự kiện
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Hủy đăng ký khi component unmount
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Hiển thị thanh cảnh báo khi offline
    if (!isOnline) {
        return (
            <div className="fixed top-0 left-0 z-50 w-full bg-red-500 px-4 py-2 text-center text-white">
                Bạn đang offline. Một số tính năng có thể không hoạt động.
            </div>
        );
    }

    // Không hiển thị gì khi online
    return null;
};

export default OfflineDetector;
