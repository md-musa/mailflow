import { api } from './axios';

import type { LoginPayload, RegisterPayload, AuthResponse } from '@/types/auth.types';

export const login = async (
    payload: LoginPayload,
) => {
    const response = await api.post<AuthResponse>(
        '/auth/login',
        payload,
    );

    return response.data;
};

export const register = async (
    payload: RegisterPayload,
) => {
    const response = await api.post<AuthResponse>(
        '/auth/register',
        payload,
    );

    return response.data;
};