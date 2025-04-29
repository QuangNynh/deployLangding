export enum PageCodeBanner {
    ERROR_404_500 = "ERROR_404_500",
    CASE_STUDY = "CASE_STUDY",
    RECRUITMENT = "RECRUITMENT",
    CORE_VALUES = "CORE_VALUES",
    CASE_STUDY_DETAIL_NEWS = "CASE_STUDY_DETAIL_NEWS",
    SERVICES_SOLUTIONS = "SERVICES_SOLUTIONS",
    ABOUT_US = "ABOUT_US",
    CONTACT = "CONTACT",
    PRODUCTS = "PRODUCTS",
    HOME = "HOME",
    CHATBOT = "CHATBOT",
  }
  

  export type MediaType = {
    id: string;
    fileLink: string;
    redirectLink: string;
    userId: string;
    fullName: string;
    altText: string;
    fileType: string;
    fileName: string;
    createdAt: string;
    updatedAt: string;
  };
  
  export type BannerType = {
    id: string;
    pageId: string;
    pageName: string;
    name: string;
    transitionTime: number;
    media: MediaType[];
    createdAt: string;
    updatedAt: string;
  };
  