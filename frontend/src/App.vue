<script setup lang="ts">
import { useUserStore } from "./stores/user";

const user = useUserStore();

user.initialize();
</script>

<template>
    <RouterView />
</template>