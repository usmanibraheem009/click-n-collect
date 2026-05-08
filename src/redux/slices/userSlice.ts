import { User } from "@/src/utils/types";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
};

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},

});

export default userSlice.reducer;