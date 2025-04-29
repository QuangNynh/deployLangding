export interface NewsType {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    datePosted: string | null;
    source: string | null;
    writer: string | null;
    status: string;
    category: string;
    card: string[];
    shortDescription: string;
    avatar: string;
    urlBanner:string;
    type: string;
    metaDescription: string;
    urlPath: string;
  }
  
 export interface NewsResponse {
      content: NewsType[];
      totalElements:number
  }

 export enum  TypeNews {
  NEW="NEW",
  HOT="HOT",
  COMPANY="COMPANY"
 }
