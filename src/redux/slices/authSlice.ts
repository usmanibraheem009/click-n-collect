import { createSlice } from '@reduxjs/toolkit';


export interface authUser{
    id: string , 
    email: string | null,
    userName?: string,
    profileImageUrl?: string
};

interface authState{
    user: authUser | null,
    loading: boolean,
    isAuthChecked: boolean
}

const initialState : authState = {
    user: null,
    loading: true,
    isAuthChecked: false
}


export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        clearUser: (state) => {
            state.user = null
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload
        }
    }
});

export const {setUser, clearUser, setLoading, setAuthChecked} = authSlice.actions;
export default authSlice.reducer;