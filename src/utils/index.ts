import * as qs from 'qs';
import { DateTime } from 'luxon';

export const convertQueryParam = (params: Record<string, unknown>): string => {
    const queryParams = qs.stringify(params);
    return queryParams;
};

export const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Hàm chuyển đổi ngày giờ
export const convertDateToFormat = (isoDate: string, locale: 'vi' | 'en' = 'vi') => {
    // Parse chuỗi ISO thành đối tượng DateTime
    const date = DateTime.fromISO(isoDate);

    // Kiểm tra nếu ngày không hợp lệ
    if (!date.isValid) {
        return 'Invalid Date';
    }

    // Định dạng ngày dựa trên locale
    if (locale === 'vi') {
        return date.setLocale('vi').toFormat('dd-MM-yyyy');
    } else {
        return date.setLocale('en').toFormat('MMM dd, yyyy');
    }
};

// Hàm kiểm tra loại media (ảnh hoặc video)
export const isVideo = (fileLink: string) => {
    if (!fileLink) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    return videoExtensions.some(ext => fileLink.toLowerCase().endsWith(ext));
};
