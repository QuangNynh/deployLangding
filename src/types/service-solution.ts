export interface ServiceSolutionType {
    id: string;
    name: string;
    serviceType: string;
    tags: string[];
    shortDescription: string;
    thumbnailUrl: string;
    urlSlug: string;
    description: string;
    metaDescription: string;
    urlBanner: string;
}


export interface ServiceSolutionDetailResponse {
    data: ServiceSolutionType;
}
