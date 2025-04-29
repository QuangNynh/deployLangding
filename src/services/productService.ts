import api from "@/config/axios";

class ProductService {
    async getProducts(locale: string) {
        const response = await api.get(`/products?pageSize=100&pageNumber=0&languageType=${locale.toUpperCase()}`);
        return response.data;
    }
}

export const productService = new ProductService();
