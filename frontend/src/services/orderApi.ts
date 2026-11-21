import axios from "axios";

import {useUserStore} from "../stores/user"



const orderApi = axios.create({
    baseURL: "http://localhost:3001/orders"
});

orderApi.interceptors.request.use((config) => {
    const user = useUserStore()
    const token = user.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default orderApi;