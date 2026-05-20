import { fetchCurrentUser } from "@/src/apis/authApi";
import { User } from "@/src/utils/types";
import { createSlice } from "@reduxjs/toolkit";

interface userState {
    user: User | null;
    role: 'ADMIN' | 'USER' | null;
    loading: boolean;
    error: string | null;
};

const initialState: userState = {
    user: null,
    role: null,
    error: null,
    loading: false
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (buidler) => {
        buidler.addCase(fetchCurrentUser.pending, state => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.role = action.payload.role
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'something went wrong';
            })
    }
});

export default userSlice.reducer;