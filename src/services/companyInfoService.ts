import api from "@/config/axios";

class CompanyInfoService {
    
    async getCompanyInfo(locale?:string) {
        const response = await api.get(`/company-info?languageType=${locale?.toUpperCase()}`);
        return response.data.data[0];
    }
}

export const companyInfoService = new CompanyInfoService();
