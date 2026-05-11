export interface User {
    id: string
    fullName: string
    email: string
    role: 'ADMIN' | 'USER'
    createdAt: string,
};

export interface SignupRequest {
    name: string,
    email: string,
    password: string,
};

export interface LoginRequest {
    email: string,
    password: string,
};

export interface LoginSession {
    accessToken: string;
    refreshToken: string;
    sessionId: string;
    expiresAt: string;
};

export interface LoginResponse {
    success: boolean;
    message: string;
    data: LoginSession;
}