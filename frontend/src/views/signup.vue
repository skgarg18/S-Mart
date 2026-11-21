<script setup lang="ts">
import { ref } from "vue";

import { useRouter } from "vue-router";

import authApi from "../services/authApi.ts";
import axios from "axios";

import Navbar from "../components/Navbar.vue";
import signUpPage from "../components/login/signupPage.vue";

const router = useRouter();

const loading = ref(false);
const errorMessage = ref("");


const handleSingUp = async (name: string, email: string, password: string) => {


    errorMessage.value = "";

    if (!name || !email || !password) {
        errorMessage.value = "Please fill all the fields";
        return;
    }

    try {

        loading.value = true;

        const response = await authApi.post(
            "/signup",
            {
                name: name,
                email: email,
                password: password
            }
        );

        console.log("Signup response:", response.data);

        router.push("/login");
        
    } catch (error) {
        
        console.log("Signup error:", error);
        if (axios.isAxiosError(error)) {
            errorMessage.value =
                error.response?.data?.message || "Signup failed";
        } else {
            errorMessage.value = "Unable to connect to server";
        }
    } finally {
        loading.value = false;
    }

};
</script>

<template>
    <Navbar />
    <signUpPage :error-message="errorMessage" @signup="handleSingUp" /> 
  
</template>