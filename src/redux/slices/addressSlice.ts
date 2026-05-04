import { getCities, getCountries, getState } from "@/src/apis/locationApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCountries = createAsyncThunk(
    "location/fetchCountries",
    async () => {
        return await getCountries();
    }
);

export const fetchStates = createAsyncThunk(
    "loaction/fetchStates",
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

export type locationType = 'Home' | 'Office' | 'Educaion institue' | 'other';

export interface newAddress {
    id: string,
    type: locationType,
    country: string,
    state: string,
    city: string,
    streetAddress: string,
    landMark?: string,
    phoneNumber: string
};

type listState = {
    addressList: newAddress[],
    country: { label: string, value: string }[],
    state: { label: string, value: string }[],
    city: { label: string, value: string }[],
    loading: boolean,
    phoneNumber: string,
}

const initialState = {
    addressList: [],
    country: [],
    state: [],
    city: [],
    loading: false,
    phoneNumber: '',
} as listState;

const addressSlice = createSlice({
    name: 'addressSlice',
    initialState,
    reducers: {
        addOrderAddress: (state, action) => {
            state.addressList.push({ ...action.payload, id: Date.now() });
        }
    },
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
    },
});

export const { addOrderAddress } = addressSlice.actions;

export default addressSlice.reducer