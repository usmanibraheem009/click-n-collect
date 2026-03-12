import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import AuthReducer from '../slices/authSlice';
import ThemeReducer from '../slices/themeSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whiteList: ['authReducer', 'themeReducer']
}

const rootReducers = combineReducers({
    authReducer: AuthReducer,
    themeReducer: ThemeReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const MyStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: false,
        }).concat()
});

export const persistor = persistStore(MyStore);
export default MyStore;