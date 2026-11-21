import {defineStore} from "pinia"
import {ref, computed} from "vue"

import { jwtDecode } from "jwt-decode";

import type {JwtPayload} from "../types/jwtTokenContext"


export const useUserStore = defineStore("user" , () => {

    const token = ref<string | null>(localStorage.getItem("token"));

    const role= ref<string>("USER"); 

    const setToken = (newToken:string) =>{

        token.value = newToken;

        localStorage.setItem("token" , newToken);

        const decoded = jwtDecode<JwtPayload>(newToken);

        role.value = decoded.role;


    }

    const initialize = () => {

        if (!token.value) {
            return;
        }

        try {

            const decoded = jwtDecode<JwtPayload>(token.value);

            role.value = decoded.role;

        } catch (error) {

            console.error("Invalid token:", error);

            removeToken();
        }
    };

    // Remove authentication
    const removeToken = () => {

        localStorage.removeItem("token");

        token.value = null;

        role.value = "USER";
    };

    // Reactive login status
    const isLoggedIn = computed(() => {
        return token.value !== null;
    });

    return{
        token,
        role,
        setToken,
        removeToken,
        isLoggedIn,
        initialize
    }
    
    


})