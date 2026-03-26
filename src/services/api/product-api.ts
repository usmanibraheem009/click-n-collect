import { api } from "./api";

// export const getAllProducts = async () => {
//     try{ 
//         const response = await api.get(`/category/${category}`);
//         return response.data;
//     }catch(error){
//         console.log('Error fetching products: ', error)
//         throw error;
//     }
// };

export const getCategories = async () => {
    try{
        const response = await api.get('/categories');
        return response.data;
    }catch(error){
        console.log('error fetching categories: ', error);
        throw error;
    }
};

export const getProductsByCategory = async (category: string) => {
    try {
        const response = await api.get(`/category/${category}`);
        return response.data;
    }catch(error){
        console.log('Error fetching products: ', error)
        throw error;
    }
};