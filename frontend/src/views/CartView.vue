<script setup lang="ts">

import Navbar from "../components/Navbar.vue";
import Cart from "../components/cart/Cart.vue";


</script>

<template>
    <div class="min-h-screen bg-gray-50">

        <Navbar/>

        <main class="mx-auto max-w-7xl px-6 py-8">

            <div>
                <Cart />
            </div>

        </main>

    </div>
</template>
