import SecureStore from "expo-secure-store";
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
        throw error.response?.data?.message || "Registration failed";
    }
};

export const loginUser = async (data: LoginRequest): Promise<LoginSession> => {
    try {
        const response = await axiosInstance.post<LoginResponse>("/auth/login", data);
        const session = response.data.data;

        await SecureStore.setItemAsync("accessToken", session.accessToken);
        const savedToken = await SecureStore.getItemAsync("accessToken");

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${session.accessToken}`;

        return session;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Sign in failed');
    }
}

export const fetchCurrentUser = async (): Promise<User> => {
    try {
        const response = await axiosInstance.get("/auth/me");
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch user data');
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
