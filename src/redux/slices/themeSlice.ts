import { createSlice } from "@reduxjs/toolkit";

export type themeMode = 'light' | 'dark' | 'system';

interface themeState{
    currentMode: themeMode
};

const initialState: themeState = {
    currentMode : 'system'
};

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.currentMode = action.payload
        }
    }
});

export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer;