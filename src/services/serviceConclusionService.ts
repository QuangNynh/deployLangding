import api from "@/config/axios";

class ServiceSolutionService {
    async getServiceSolutions(locale:string) {
        const response = await api.get(`/service-solutions?languageType=${locale.toUpperCase()}`);
        return response.data.data;
    }
    async getServiceSolutionDetail(slug:string,locale:string) {
        const response = await api.get(`/service-solutions/url?url=${slug}&languageType=${locale.toUpperCase()}`);
        return response.data.data;
    }
    async getServiceSolutionRelated(urlPath:string,locale:string) {
        const response = await api.get(`/service-solutions/related?url=${urlPath}&languageType=${locale.toUpperCase()}`);
        return response.data.data;
    }
}

export const serviceSolutionService = new ServiceSolutionService();
