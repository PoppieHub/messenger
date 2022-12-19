import axios from 'axios';
import {baseUrl, exceptionUrl, refreshToken} from '../routes';
import {AuthResponse} from "../models/response/AuthResponse";
import {store} from '../index'

const apiClient = axios.create({
    withCredentials: false, // к каждому запросу cookie цепляются автоматически
    baseURL: baseUrl()
});

apiClient.interceptors.request.use((config) => {
    if (config.url?.includes(exceptionUrl())) {
        return config;
    }
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem(`${process.env.REACT_APP_NAME_TOKEN}`)}`;
    return config;
});

apiClient.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    let countErrorsRequest = 0;

    if (
        error.response.status === 401 &&
        error.config &&
        !originalRequest._isRetry
    ) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post<AuthResponse>(refreshToken(),
                {"refresh_token": localStorage.getItem(`${process.env.REACT_APP_NAME_REFRESH_TOKEN}`)}
            );
            store.setTokensTolLocalStorage(response);
            countErrorsRequest = 0;

            return apiClient.request(originalRequest);
        } catch (e) {
            countErrorsRequest++;

            if (countErrorsRequest > 3) {
                store.logout();
            }
        }
    }
    throw error;
});

export default apiClient;