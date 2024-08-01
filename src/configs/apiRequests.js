import axios from 'axios';
import { API_BASE_URL } from './apiUrls';

console.log(API_BASE_URL);

const apiService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'content-type': 'application/json'
    },
});

const apiRequests = async (method, endpoint, data = null, params = null, accessToken) => {
    try {
        const requestData = data ? { data } : {};
        const response = await apiService({
            method,
            url: `${apiService.defaults.baseURL}${endpoint}`,
            ...requestData,
            params,
            headers: {
                ...apiService.defaults.headers,
                'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
                'Authorization': accessToken,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log('response error', error.response.data);
            throw error.response.data;
        } else if (error.request) {
            console.log('request error', error.request);
            throw new Error('Request error');
        } else {
            console.log('error message', error.message);
            throw new Error(error.message);
        }
    }
};

export default apiRequests;
