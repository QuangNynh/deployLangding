import { useQuery } from "@tanstack/react-query";
import { staticContentService } from "@/services/staticContentService";
import { BannerType, PageCodeBanner } from "@/types/static-content";

export const useBanner = (pageCode: PageCodeBanner) => {
    return useQuery<BannerType[]>({
        queryKey: ["banner", pageCode],
        queryFn: () => staticContentService.getBannerByPageCode(pageCode),
        staleTime: 5 * 60 * 1000,
    });
};
