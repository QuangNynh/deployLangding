export enum Locale {
  en = "en",
  vi = "vi",
}
export interface Pagination {
  pageNumber: number;
  pageSize: number;
  sort?: string;
  order?: string;
}
