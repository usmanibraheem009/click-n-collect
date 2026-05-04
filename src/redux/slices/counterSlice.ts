import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { cartItems: [] as any[] },
    reducers: {
        addToCart: (state, action) => {
            const existing = state.cartItems.find((item: any) => item.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item: any) => item.id !== action.payload);
        },

    }
});

export const { addToCart, removeFromCart, } = cartSlice.actions;
export default cartSlice.reducer;