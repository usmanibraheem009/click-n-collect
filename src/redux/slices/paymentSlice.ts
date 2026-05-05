import { auth, db } from "@/src/services/firebaseConfig";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";

export interface paymentMethod {
    id: string;
    type: 'Card' | 'Cash on Delivery' | 'JazzCash';
    cardHolderName?: string;
    cardNumber?: string;
    cardExpiry?: string;
    mobileNumber?: string;
    accountTitle?: string
};

const initialState = {
    paymentList: [] as paymentMethod[],
    loading: false,
    error: null as string | null
};

export const fetchPaymentMethods = createAsyncThunk(
    "payment/fetchPaymentMethods",
    async () => {
        const uid = auth.currentUser?.uid;
        if (!uid) return [];

        const snapshot = await getDocs(collection(db, 'users', uid, 'paymentMethods'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as paymentMethod[];
    }
);

export const addPaymentMethod = createAsyncThunk(
    "payment/addPaymentMethod",
    async (values: Omit<paymentMethod, 'id'>) => {
        const uid = auth.currentUser?.uid;

        if (!uid) throw new Error('Not authenticated');

        const ref = await addDoc(collection(db, 'users', uid, 'paymentMethods'), values);

        return { id: ref.id, ...values };
    }
);

export const deletePaymentMethod = createAsyncThunk(
    "payment/deletePaymentMethod",
    async (id: string) => {
        const uid = auth.currentUser?.uid;

        if (!uid) throw new Error('Not authenticated');

        await deleteDoc(doc(db, 'users', uid, 'paymentMethods', id));

        return id;
    }
)

const paymentSlice = createSlice({
    name: 'paymentSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentMethods.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPaymentMethods.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.paymentList = action.payload;
            })
            .addCase(fetchPaymentMethods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'failed to fetch';
            })
            .addCase(addPaymentMethod.fulfilled, (state, action: PayloadAction<any>) => {
                state.paymentList.push(action.payload);
            })
            .addCase(deletePaymentMethod.fulfilled, (state, action) => {
                state.paymentList = state.paymentList.filter((a: any) => a.id !== action.payload)
            })
    }
});

export default paymentSlice.reducer;