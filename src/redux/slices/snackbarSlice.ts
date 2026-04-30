import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type snackbarTpye = 'success' | 'info' | 'error';

interface snackbarState {
    visible: boolean,
    message: string,
    type: snackbarTpye,
};

const initialState: snackbarState = {
    visible: false,
    message: "",
    type: 'info',
};

const snackbarSlice = createSlice({
    name: 'snackbarSlice',
    initialState,
    reducers: {
        showSnackbar: (state, action: PayloadAction<{ message: string, type?: snackbarTpye }>) => {
            state.visible = true;
            state.message = action.payload.message;
            state.type = action.payload.type || 'info';
        },
        hideSnackbar: (state) => {
            state.visible = false;
            state.message = "";
        }
    }
});

export const { hideSnackbar, showSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;