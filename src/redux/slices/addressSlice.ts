import { getCities, getCountries, getState } from "@/src/apis/locationApi";
import { auth, db } from "@/src/services/firebaseConfig";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";


export const fetchCountries = createAsyncThunk(
    "location/fetchCountries",
    async () => {
        return await getCountries();
    }
);

export const fetchStates = createAsyncThunk(
    "location/fetchStates",
    async (country: string) => {
        return await getState(country);
    }
);

export const fetchCity = createAsyncThunk(
    "location/fetchCity",
    async ({ country, state }: { country: string, state: string }) => {
        return await getCities(country, state);
    }
);

export const fetchAddresses = createAsyncThunk(
    "address/fetchAddresses",
    async () => {
        const uid = auth.currentUser?.uid;
        if (!uid) return [];

        const snapshot = await getDocs(collection(db, 'users', uid, 'addresses'));

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
);

export const addAddress = createAsyncThunk(
    "address/addAddress",
    async (values: any) => {
        const uid = auth.currentUser?.uid;
        if (!uid) throw Error('Not authtenticated');

        const { id, ...dataToSave } = values;
        const ref = await addDoc(collection(db, 'users', uid, 'addresses'), dataToSave);

        return { ...dataToSave, id: ref.id }
    }
);

export const deleteAddress = createAsyncThunk(
    "address/deleteAddress",
    async (addressId: string) => {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error('Not authenticated');

        await deleteDoc(doc(db, 'users', uid, 'addresses', addressId));

        return addressId;
    }
);

export type locationType = 'Home' | 'Office' | 'Educaion institue' | 'other';

export interface newAddress {
    id: string,
    type: locationType,
    country: string,
    state: string,
    city: string,
    streetAddress: string,
    landMark?: string,
    phoneNumber: string,
    yourName: string
};

type listState = {
    addressList: newAddress[],
    country: { label: string, value: string }[],
    state: { label: string, value: string }[],
    city: { label: string, value: string }[],
    loading: boolean,
    phoneNumber: string,
    yourName: string,
    error: string | null;
}

const initialState = {
    addressList: [],
    country: [],
    state: [],
    city: [],
    loading: false,
    phoneNumber: '',
    error: '',
    yourName: ''
} as listState;

const addressSlice = createSlice({
    name: 'addressSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.country = action.payload;
            })
            .addCase(fetchStates.fulfilled, (state, action) => {
                state.state = action.payload;
            })
            .addCase(fetchCity.fulfilled, (state, action) => {
                state.city = action.payload;
                state.loading = false
            })
            .addCase(fetchAddresses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddresses.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.addressList = action.payload
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch addresses';
            })

        builder.addCase(addAddress.fulfilled, (state, action: PayloadAction<any>) => {
            state.addressList.push(action.payload);
        })

        builder.addCase(deleteAddress.fulfilled, (state, action: PayloadAction<any>) => {
            state.addressList = state.addressList.filter((a) => a.id !== action.payload)
        })
    },
});

export default addressSlice.reducer