import axios from "axios";
import { Router } from "react-router-dom";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`
});

axiosClient.interceptors.request.use((config) => {
    const token = ''
    config.headers.Authorization = `Bearer ${token}`
    return config;
});

axiosClient.interceptors.response.use(response => {
    return response; 
}, error => {
    if (error.response && error.response.status === 401) {
        Router.navigate('/login')
        return error;
    } 
    throw error;

})


export default axiosClient;