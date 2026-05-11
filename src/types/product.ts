export interface Product {
    _id: string,
    title: string,
    category: string,
    price: number,
    image: string,
    description?: string,
    brand?: string,
    rating?: string,
    stock?: number,
    isNew?: boolean,
    colors?: string[],
    sizes?: string[],
};

export interface CreateProductRequest {
    title: string;
    category: string;
    price: number;
    image: string;
    description?: string;
    brand?: string;
    stock?: number;
    isNew?: boolean;
    colors?: string[];
    sizes?: string[];
};

export type UpdateProductRequest = Partial<CreateProductRequest>;

export interface ProductSection {
    title: string;
    data: Product[];
}