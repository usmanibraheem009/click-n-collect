import { createSlice } from "@reduxjs/toolkit";

type cartItem = {
    id: number,
    title: string,
    category: string,
    price: number,
    image: string,
    quantity: number,
    color: string,
    size: string,
};

type cartState = {
    cartItems: cartItem[]
};

const initialState: cartState = {
    cartItems: []
};

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload

            const existingItem = state.cartItems.find((cartItem) =>
                cartItem.id === item.id &&
                cartItem.size === item.size &&
                cartItem.color === item.color
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({
                    ...item,
                    quantity: 1
                })
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload)
        },

        clearCart: (state) => {
            state.cartItems = []
        },
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;