import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';

export interface Session {
    accessToken: string;
    refreshToken: string;
    sessionId: string;
    expiresAt: string;
};

interface Authstate {
    isLoggedIn: boolean;
};

const initialState: Authstate = {
    isLoggedIn: false
};

const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: {
        setLoggedIn: (state) => {
            state.isLoggedIn = true;
        },
        setLoggedOut: (state) => {
            state.isLoggedIn = false;
        }
    }
});


export const saveSessionToStore = async (session: Session) => {
    await Promise.all([
        SecureStore.setItemAsync('accessToken', session.accessToken || ''),
        SecureStore.setItemAsync('refreshToken', session.refreshToken || ''),
        SecureStore.setItemAsync('sessionId', session.sessionId || ''),
        SecureStore.setItemAsync('expiresAt', session.expiresAt || '')
    ]);
};

export const loadSessionFromStore = async (): Promise<boolean> => {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    const refreshToken = await SecureStore.getItemAsync('refreshToken');


    return !!accessToken && !!refreshToken;
};

export const clearSessionFromStore = async () => {
    await Promise.all([
        SecureStore.deleteItemAsync('accessToken'),
        SecureStore.deleteItemAsync('refreshToken'),
        SecureStore.deleteItemAsync('sessionId'),
        SecureStore.deleteItemAsync("expiresAt"),
    ]);
}

export const { setLoggedIn, setLoggedOut } = AuthSlice.actions;
export default AuthSlice.reducer;