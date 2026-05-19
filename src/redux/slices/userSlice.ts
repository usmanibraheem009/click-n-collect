import { User } from "@/src/utils/types";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: User | null;
    role: 'ADMIN' | 'USER' | null;
    loading: boolean;
    error: string | null;
};

const initialState: UserState = {
    user: null,
    role: null,
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.role = action.payload?.role || null;
            state.loading = false;
            state.error = null;
        },
        clearUser(state) {
            state.user = null;
            state.role = null;
            state.loading = false;
            state.error = null;
        },
    },

});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;