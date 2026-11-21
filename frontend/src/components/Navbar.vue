<script setup lang="ts">
import {
    ShoppingCart,
    Home,
    UserCog2,
    LogIn,
    LogOut
} from "lucide-vue-next";

import { computed} from "vue";
import { useRouter } from "vue-router";

import {useCartStore} from "../stores/cart.ts";
import {useUserStore} from "../stores/user.ts"


const router = useRouter();

function goToCart() {
    router.push("/cart");
}

const cart = useCartStore();
const user = useUserStore();

const cartCount = computed(() => {
    return cart?.cartItems.length ?? 0;
});

const role = user.role;

const isLoggedIn = user.isLoggedIn;

function goToLogin() {
    router.push("/login");
}

function logout() {
    user.removeToken();
    router.push("/login");
}
</script>

<template>
    <header class="border-b border-gray-800 bg-gray-900 text-white shadow-md">

        <div
            class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        >

            <!-- Logo -->
            <RouterLink to="/" class="group">
                <h1
                    class="text-2xl font-bold tracking-tight text-white transition group-hover:text-blue-400"
                >
                    QuickMart
                </h1>

                <p class="text-xs text-gray-400">
                    Fresh products, delivered fast
                </p>
            </RouterLink>


            <!-- Navigation -->
            <nav class="flex items-center gap-2">

                <!-- Home -->
                <RouterLink
                    to="/"
                    class="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
                >
                    <Home class="h-5 w-5" />
                    <span>Home</span>
                </RouterLink>


                <!-- Admin -->
                <RouterLink
                    v-if="role === 'ADMIN'"
                    to="/admin"
                    class="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
                >
                    <UserCog2 class="h-5 w-5" />
                    <span>Admin</span>
                </RouterLink>


                <!-- Cart -->
                <button
                    class="flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-200"
                    @click="goToCart"
                >
                    <ShoppingCart class="h-5 w-5" />

                    <span>Cart</span>

                    <span
                        v-if="cartCount > 0"
                        class="rounded-full bg-gray-900 px-2 py-0.5 text-xs font-semibold text-white"
                    >
                        {{ cartCount }}
                    </span>
                </button>


                <!-- Login -->
                <button
                    v-if="!isLoggedIn"
                    class="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    @click="goToLogin"
                >
                    <LogIn class="h-5 w-5" />
                    <span>Login</span>
                </button>


                <!-- Logout -->
                <button
                    v-else
                    class="flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    @click="logout"
                >
                    <LogOut class="h-5 w-5" />
                    <span>Logout</span>
                </button>

            </nav>

        </div>

    </header>
</template>