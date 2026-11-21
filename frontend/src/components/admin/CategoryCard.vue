<script setup lang="ts">
import { Package, ArrowRight } from "lucide-vue-next";
import { useRouter } from "vue-router";

const props = defineProps<{
    category: string;
    productCount: number;
}>();

const router = useRouter();

function manageCategory() {
    router.push(
        `/admin/products/${encodeURIComponent(props.category)}`
    );
}
</script>

<template>
    <div
        class="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
    >

        <!-- Subtle top accent -->
        <div
            class="absolute left-0 top-0 h-1 w-full bg-black"
        ></div>


        <!-- Header -->
        <div class="flex items-start justify-between">

            <div>
                <p class="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Category
                </p>

                <h2 class="mt-1 text-xl font-bold text-gray-900">
                    {{ category }}
                </h2>
            </div>

            <div
                class="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 transition-colors duration-200 group-hover:bg-gray-200"
            >
                <Package class="h-5 w-5 text-gray-700" />
            </div>

        </div>


        <!-- Product count -->
        <div class="mt-8">

            <p class="text-4xl font-bold tracking-tight text-gray-900">
                {{ productCount }}
            </p>

            <p class="mt-1 text-sm text-gray-500">
                {{ productCount === 1 ? "Product" : "Products" }}
            </p>

        </div>


        <!-- Divider -->
        <div class="my-6 border-t border-gray-100"></div>


        <!-- Manage button -->
        <button
            class="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            @click="manageCategory"
        >
            <span>
                Manage Products
            </span>

            <ArrowRight
                class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
        </button>

    </div>
</template>