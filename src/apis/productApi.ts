import { Product, ProductSection } from "../types/product";
import axiosInstance from "./axiosInstance";

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axiosInstance.get("/products");
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || "Failed to fetch products");
    }
};

export const getGroupedProducts = async (): Promise<ProductSection[]> => {
    try {
        const response = await axiosInstance.get("products/grouped");

        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || "Failed to fetch products");
    }
};

export const getProductById = async (id: string): Promise<Product> => {
    try {
        const response = await axiosInstance.get(`products/${id}`);
        return response.data.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || "Failed to fetch product");
    }
};



