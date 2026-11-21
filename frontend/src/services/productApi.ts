import axios from "axios";
import {useUserStore} from "../stores/user"



const productApi = axios.create({
    baseURL: "http://localhost:3000/product"
});

productApi.interceptors.request.use((config) => {
    const user = useUserStore()
    const token = user.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default productApi;