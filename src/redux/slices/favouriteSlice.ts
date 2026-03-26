import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
    name: 'favouriteSlice',
    initialState: {
        favorites: [] as any[]
    },
    reducers: {
        toggleFavorites: (state, action) => {
            const item = action.payload;

            const itemId = Number(item.id);

            const existsIndex = state.favorites.findIndex(
                (fav : any) => fav.id === itemId
            );

            if(existsIndex != -1){
                state.favorites.splice( existsIndex, 1 )
            }else{
                state.favorites.push({...item, id: itemId})
            }
        },

        clearFavorites: (state) => {
            state.favorites = []
        }

    }
});

export const {toggleFavorites, clearFavorites} = favouritesSlice.actions;
export default favouritesSlice.reducer;