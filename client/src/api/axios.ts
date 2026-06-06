import axios from 'axios';

const BASE_URL = "https://mailflow-production-7845.up.railway.app"
// const BASE_URL = "http://localhost:3000";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            window.location.href = '/auth';
        }

        return Promise.reject(error);
    },
);