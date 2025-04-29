import api from "@/config/axios";
import { PageCodeBanner } from "@/types/static-content";

class StaticContentService {
    async getBannerByPageCode(code:PageCodeBanner ) {
        const response = await api.get(`banners/page-code/${code}`);
        return response.data.data;
    }
}

export const staticContentService = new StaticContentService();
