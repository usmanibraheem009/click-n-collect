import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface orderState {
    address: any | null;
    shippingMethod: any | null;
    paymentMethod: any | null;
    cartItems: any[],
    subTotal: number,
    shippingFee: number,
    grandTotal: number
};

const initialState: orderState = {
    address: null,
    shippingMethod: null,
    paymentMethod: null,
    cartItems: [],
    subTotal: 0,
    shippingFee: 0,
    grandTotal: 0
};

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setOrderAddress: (state, action: PayloadAction<any>) => {
            state.address = action.payload;
        },
        setShippingMethod: (state, action: PayloadAction<any>) => {
            state.shippingMethod = action.payload;
            state.shippingFee = Number(action.payload.price);
            state.grandTotal = Number(state.subTotal + action.payload.price);
        },
        setPaymentMethod: (state, action: PayloadAction<any>) => {
            state.paymentMethod = action.payload;
        },
        setcartSummary: (state, action: PayloadAction<any>) => {
            state.cartItems = action.payload.cartItems;
            state.subTotal = action.payload.subTotal;
        },
        clearOrderSummary: (state) => {
            return initialState;
        }
    }
});

export const { clearOrderSummary, setOrderAddress, setPaymentMethod, setShippingMethod, setcartSummary } = orderSlice.actions;
export default orderSlice.reducer;