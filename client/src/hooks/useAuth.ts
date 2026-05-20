import { useNavigate } from 'react-router-dom';

import {
    login,
    register,
} from '@/api/auth.api';

import type {
    LoginPayload,
    RegisterPayload,
} from '@/types/auth.types';

import {
    setAccessToken,
    removeAccessToken,
} from '@/utils/token';

export const useAuth = () => {
    const navigate = useNavigate();

    const loginUser = async (payload: LoginPayload) => {
        const data = await login(payload);
        setAccessToken(data.accessToken);
        navigate('/');
    };

    const registerUser = async (payload: RegisterPayload) => {
        const data = await register(payload);
        setAccessToken(data.accessToken);
        navigate('/');
    };

    const logout = () => {
        removeAccessToken();
        navigate('/login');
    };

    return {
        loginUser,
        registerUser,
        logout,
    };
};