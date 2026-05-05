import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import addressReducer from "../slices/addressSlice";
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import counterReducer from "../slices/counterSlice";
import favoritesReducer from "../slices/favouriteSlice";
import imageReducer from "../slices/imageSlice";
import orderReducer from "../slices/orderSlice";
import paymentRedcer from "../slices/paymentSlice";
import productReducer from "../slices/productSlice";
import snackbarReducer from "../slices/snackbarSlice";
import themeReducer from "../slices/themeSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["authreducer", "favoritesreducer", "cartreducer"],
};

const rootReducer = combineReducers({
  authreducer: authReducer,
  themereducer: themeReducer,
  imagereducer: imageReducer,
  favoritesreducer: favoritesReducer,
  cartreducer: cartReducer,
  productsreducer: productReducer,
  snackbarreducer: snackbarReducer,
  counterreducer: counterReducer,
  addressreducer: addressReducer,
  orderreducer: orderReducer,
  paymentreducer: paymentRedcer,
});

const persistedReducer =
  persistReducer(persistConfig, rootReducer);

const MyStore = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(MyStore);
export type RootState = ReturnType<typeof MyStore.getState>;
export type AppDispatch = typeof MyStore.dispatch;

export default MyStore;
