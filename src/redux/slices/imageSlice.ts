import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
    name: 'imageSlice',
    initialState: {
        imageUrl: null
    },
    reducers: {
        setImage: (state, action) => {
            state.imageUrl = action.payload
        },

        clearImage: (state) => {
            state.imageUrl = null;
        }
    }
});

export const {setImage, clearImage} = imageSlice.actions;
export default imageSlice.reducer;