<script setup lang="ts">
import { ref, provide} from "vue";
import authApi from "../services/authApi.ts"
import { useRouter } from "vue-router";

import LoginPage from "../components/login/loginPage.vue";
import Navbar from "../components/Navbar.vue";

import {useUserStore} from "../stores/user.ts"

const router = useRouter();

const loading = ref(false);
const errorMessage= ref("");

const userStore = useUserStore()

provide("loading", loading);
provide("errorMessage", errorMessage);

const login = async (email:string , password:string) => {
    errorMessage.value = "";

    if (!email || !password) {
        errorMessage.value = "Please enter email and password";
        return;
    }

    try {
        loading.value = true;

        // console.log("Sending login request with email:", email, "and password:", password);

        const response = await authApi.post(
            "/login",
            {
                email: email,
                password: password
            }
        );

        console.log("Login response:", response.data);

        const token = response.data.token;

        userStore.setToken(token);

        router.push("/");

    } catch (error: any) {

        console.log("Login error:", error);
        if (error.response) {
            errorMessage.value =
                error.response?.data?.message || "Login failed";
        } else {
            errorMessage.value = "Unable to connect to server";
        }
    } finally {
        loading.value = false;
    }
};


</script>

<template>
    <Navbar/>
    <LoginPage @login = "login"/>
</template>