import api from "@/config/axios";

class CaseStudyService {
    async getCaseStudy(locale:string) {
        const response = await api.get(`/case-studies?pageSize=4&pageNumber=0&languageType=${locale.toUpperCase()}`);
        return response.data;
    }
    async getCaseStudyDetail(slug:string,locale:string) {
        const response = await api.get(`/case-studies/${slug}?languageType=${locale.toUpperCase()}`);
        return response.data.data;
    }
    async getCaseStudyRelated(urlPath:string,tags:string[],locale:string) {
        const response = await api.get(`/case-studies/related/${urlPath}?tags=${tags}&languageType=${locale.toUpperCase()}`);
        return response.data.data;
    }
}

export const caseStudyService = new CaseStudyService();
