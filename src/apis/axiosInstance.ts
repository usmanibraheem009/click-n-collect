import axios from 'axios';
import { router } from 'expo-router';
import SecureStore from 'expo-secure-store';
import { clearSessionFromStore } from '../redux/slices/authSlice';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.97.94:5000/api',
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
    withCredentials: true
});

let _store: any;
export const injectStore = (store: any) => { _store = store; };

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let failedQueue: { resolve: () => void; reject: (err: unknown) => void }[] = [];

const processQueue = (error: unknown) => {
    failedQueue.forEach((prom: any) => error ? prom.reject(error) : prom.resolve());
    failedQueue = [];
};

const refreshAccessToken = async (): Promise<string> => {
    const sessionId = await SecureStore.getItemAsync('sessionId');
    const refreshToken = await SecureStore.getItemAsync('refreshToken');

    if (!sessionId || !refreshToken) throw new Error('Session not found');

    const res = await axiosInstance.post('http://192.168.97.94:5000/api/auth/token/refresh', { sessionId, refreshToken });

    const data = res.data.data;

    await Promise.all([
        SecureStore.setItemAsync('accessToken', data.accessToken),
        SecureStore.setItemAsync('refreshToken', data.refreshToken),
        SecureStore.setItemAsync('sessionId', data.sessionId),
        SecureStore.setItemAsync('expiresAt', data.expiresAt),
    ]);

    return data.accessToken;
}

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => axiosInstance(originalRequest))
                    .catch((error) => Promise.reject(error));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newToken = await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                processQueue(null);
                return axiosInstance(originalRequest);
            } catch (error) {
                processQueue(error);
                await clearSessionFromStore();
                router.replace('/screens/login-screen');
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        };
        return Promise.reject(error);
    }
)

export default axiosInstance;