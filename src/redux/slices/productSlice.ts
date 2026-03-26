import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        categories: [],
        productsByCategory: {} as Record<string, any>
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setProductsByCategory: (state, action) => {
            const {category, products} = action.payload;
            state.productsByCategory[category] = products;
        },
    }
});

export const {setProductsByCategory, setCategories} = productSlice.actions;
export default productSlice.reducer;