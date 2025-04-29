import api from "@/config/axios";


class RecruitmentService {
  async getPositions(locale:string) {
    return api.get(`/positions?pageSize=100&pageNumber=0&languageType=${locale.toUpperCase()}`);
  }
  async getRecruitment({pageNumber, pageSize, position, workType, valueSalary,searchTitle,locale}: {pageNumber: number, pageSize: number, position: number | string, workType: number | string, valueSalary: number | string, searchTitle: string,locale:string}) {
    return api.get(`/recruitment?pageSize=${pageSize}&pageNumber=${pageNumber}&position=${position}&typeOfWork=${workType}&salaryRange=${valueSalary}&recruitmentTitle=${searchTitle}&languageType=${locale.toUpperCase()}`);
  }
  async getRecruitmentDetail(slug:string,locale:string) {
    const response = await api.get(`/recruitment/${slug}?languageType=${locale.toUpperCase()}`);
    return response.data.data;
}
}
export const recruitmentService = new RecruitmentService();
