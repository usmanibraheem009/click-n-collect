import { auth, db } from "@/src/services/firebaseConfig";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { RootState } from "../store/myStore";

interface orderState {
    address: any | null;
    shippingMethod: any | null;
    paymentMethod: any | null;
    cartItems: any[],
    subTotal: number,
    shippingFee: number,
    grandTotal: number,
    orderList: any[],
    loading: boolean,
};

const initialState: orderState = {
    address: null,
    shippingMethod: null,
    paymentMethod: null,
    cartItems: [],
    subTotal: 0,
    shippingFee: 0,
    grandTotal: 0,
    orderList: [] as any[],
    loading: false
};

export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async (_, { getState }) => {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error('Not authenticated');

        const state = getState() as RootState;

        const { address, shippingMethod, paymentMethod, cartItems, subTotal, shippingFee, grandTotal } = state.orderreducer;

        const orderData = {
            address, shippingMethod, paymentMethod, cartItems, subTotal, shippingFee, grandTotal, status: 'Confirmed', createdAt: new Date().toISOString()
        };

        const ref = await addDoc(collection(db, 'users', uid, 'orders'), orderData);
        return { id: ref.id, ...orderData };
    }
);

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async () => {
        const uid = auth.currentUser?.uid;
        if (!uid) return [];

        const q = query(collection(db, 'users', uid, 'orders'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
)

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
            state.grandTotal = state.subTotal + Number(action.payload.price);
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.fulfilled, (state, action: PayloadAction<any>) => {
                state.orderList = [action.payload, ...(state.orderList ?? [])];
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<any>) => {
                state.orderList = action.payload;
            })
    }
});

export const { clearOrderSummary, setOrderAddress, setPaymentMethod, setShippingMethod, setcartSummary } = orderSlice.actions;
export default orderSlice.reducer;