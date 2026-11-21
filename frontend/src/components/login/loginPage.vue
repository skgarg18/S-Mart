<script setup lang="ts">
import { ref, inject, type Ref } from "vue";

const email = ref("");
const password = ref("");

const emit = defineEmits<{
    login: [email: string, password: string];
}>();

const handleLogin = () => {
    emit("login", email.value, password.value);
};

const loading = inject("loading") as Ref<boolean>;
const errorMessage = inject("errorMessage") as Ref<string>;

</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">

        <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800">
                    QuickMart
                </h1>

                <p class="text-gray-500 mt-2">
                    Sign in to your account
                </p>
            </div>

            <!-- Error -->
            <div
                v-if="errorMessage"
                class="mb-5 p-3 rounded-lg bg-red-100 text-red-600 text-sm"
            >
                {{ errorMessage }}
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin">

                <!-- Email -->
                <div class="mb-5">
                    <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Email
                    </label>

                    <input
                        v-model="email"
                        type="email"
                        placeholder="Enter your email"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <!-- Password -->
                <div class="mb-6">
                    <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Password
                    </label>

                    <input
                        v-model="password"
                        type="password"
                        placeholder="Enter your password"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <!-- Login button -->
                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full py-3 rounded-lg bg-blue-600 text-white
                           font-semibold hover:bg-blue-700
                           disabled:bg-blue-300"
                >
                    {{ loading ? "Signing in..." : "Sign In" }}
                </button>

            </form>

        </div>

    </div>
</template>