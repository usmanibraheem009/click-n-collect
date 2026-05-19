import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { LoginRequest, LoginResponse, LoginSession, SignupRequest, User } from "../utils/types";
import axiosInstance from "./axiosInstance";

type sessionTokens = {
    accessToken: string;
    refreshToken: string;
    sessionId: string;
    expiresAt: string;
};

export const saveSession = async (session: sessionTokens) => {
    await Promise.all([
        SecureStore.setItemAsync('accessToken', session.accessToken),
        SecureStore.setItemAsync('refreshToken', session.refreshToken),
        SecureStore.setItemAsync('expiresAt', session.expiresAt),
        SecureStore.setItemAsync('sessionId', session.sessionId),
    ])
};

export const signupUser = async (data: SignupRequest): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post("/auth/register", data);
        const session = {
            accessToken: response.data.data.accessToken,
            refreshToken: response.data.data.refreshToken,
            sessionId: response.data.data.sessionId,
            expiresAt: response.data.data.expiresAt
        }
        await saveSession(session);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || 'Sign up failed')
        } else {
            throw new Error('Network error')
        }
    }
};

export const loginUser = async (data: LoginRequest): Promise<LoginSession> => {
    try {
        const response = await axiosInstance.post<LoginResponse>("/auth/login", data);

        await saveSession(response.data.data);
        const session = response.data.data;

        await SecureStore.setItemAsync('accessToken', session.accessToken);

        axiosInstance.defaults.headers.common.Authorization =
            `Bearer ${session.accessToken}`;
        return session;
    } catch (error: any) {
        throw new Error(error.message || error.response?.data?.message || "Login failed");
    }
};

export const fetchCurrentUser = async (): Promise<User | null> => {
    try {
        const accessToken = await SecureStore.getItemAsync('accessToken');
        if (!accessToken) return null;

        const response = await axiosInstance.get("/auth/me");
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || "Login failed");
    }
};

export const logoutUser = async () => {
    try {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        await SecureStore.deleteItemAsync('expiresAt');
        await SecureStore.deleteItemAsync('sessionId');
    } catch (error) {
        console.error("Error clearing session: ", error);
    }
};

type decodedToken = {
    exp: number;
};

export const isTokenExpired = async () => {
    const token = await SecureStore.getItemAsync('accessToken');

    if (!token) return true;

    try {
        const decoded = jwtDecode<decodedToken>(token);

        const expiryTime = decoded.exp * 1000;
        return Date.now() >= expiryTime;
    } catch (error) {
        return true;
    }
};
