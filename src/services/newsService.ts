import api from "@/config/axios";
import { Pagination } from "@/types/common";

class NewsService {
    async getNews({pageSize=10,pageNumber=0}:Pagination,filter?:string,locale?:string) {
        const response = await api.get(`/news?pageSize=${pageSize}&pageNumber=${pageNumber}&${filter}&languageType=${locale?.toUpperCase()}`);
        return response.data.data;
    }
    async getNewsDetail(slug:string,locale:string) {
        const response = await api.get(`/news/${slug}?languageType=${locale.toUpperCase()}`);
        return response.data.data;
    }
    async getNewsRelated(card:string[], urlPath:string,locale:string) {
        const response = await api.get(`/news/related-news?card=${[card]}&urlPath=${urlPath}&languageType=${locale.toUpperCase()}`);
        return response.data.data;
    }
}

export const newsService = new NewsService();
