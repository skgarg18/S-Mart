<script setup lang="ts">
import { ref } from "vue";
import { X, Plus } from "lucide-vue-next";

import type {AddProductFormDataInterface} from "../../types/admin/AddProductForm"

const props = defineProps<{
    category: string;
}>();

const emit = defineEmits<{
    close: [];
    productAdded: [product: AddProductFormDataInterface];
}>();

const name = ref("");
const description = ref("");
const price = ref<number | null>(null);
const stock = ref<number | null>(null);
const unit = ref("");

const loading = ref(false);
const error = ref("");

function closeModal() {
    if (!loading.value) {
        emit("close");
    }
}

async function addProduct() {
    error.value = "";

    if (!name.value.trim()) {
        error.value = "Product name is required.";
        return;
    }

    if (!description.value.trim()) {
        error.value = "Description is required.";
        return;
    }

    if (price.value === null || price.value < 0) {
        error.value = "Please enter a valid price.";
        return;
    }

    if (stock.value === null || stock.value < 0) {
        error.value = "Please enter a valid stock quantity.";
        return;
    }

    if (!unit.value.trim()) {
        error.value = "Unit is required.";
        return;
    }

    loading.value = true;

    try {
        console.log({
            name: name.value,
            description: description.value,
            price: price.value,
            stock: stock.value,
            unit: unit.value,
            category: props.category
        });

        emit("productAdded", {
            name: name.value,
            description: description.value,
            price: price.value,
            stock: stock.value,
            unit: unit.value,
            category: props.category
        });

        // name.value = "";
        // description.value = "";
        // price.value = null;
        // stock.value = null;
        // unit.value = "";

    } catch (err) {
        console.error(err);
        error.value = "Failed to add product.";
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <!-- Overlay -->
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-[2px]"
        @click.self="closeModal"
    >
    
        <!-- Modal -->
        <div
            class="flex max-h-[calc(100vh-3rem)] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
        >
    
            <!-- Header -->
            <div
                class="flex shrink-0 items-start justify-between border-b border-gray-200 px-6 py-5"
            >
    
                <div>
                    <h2 class="text-xl font-bold tracking-tight text-gray-900">
                        Add Product
                    </h2>
                
                    <p class="mt-1 text-sm text-gray-500">
                        Add a new product to your inventory.
                    </p>
                </div>
            
                <button
                    type="button"
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                    :disabled="loading"
                    @click="closeModal"
                >
                    <X class="h-5 w-5" />
                </button>
            
            </div>
        
        
            <!-- Scrollable Form Area -->
            <form
                class="overflow-y-auto px-6 py-6"
                @submit.prevent="addProduct"
            >
        
                <div class="space-y-5">
                
                    <!-- Product Name -->
                    <div>
                        <label
                            for="product-name"
                            class="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Product Name
                        </label>
                    
                        <input
                            id="product-name"
                            v-model="name"
                            type="text"
                            placeholder="e.g. Full Cream Milk"
                            class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-gray-500 focus:ring-4 focus:ring-gray-100"
                        />
                    </div>
                
                
                    <!-- Description -->
                    <div>
                        <label
                            for="product-description"
                            class="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Description
                        </label>
                    
                        <textarea
                            id="product-description"
                            v-model="description"
                            rows="3"
                            placeholder="Describe the product..."
                            class="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-gray-500 focus:ring-4 focus:ring-gray-100"
                        ></textarea>
                    </div>
                
                
                    <!-- Price + Stock -->
                    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    
                        <!-- Price -->
                        <div>
                            <label
                                for="product-price"
                                class="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Price
                            </label>
                        
                            <div class="relative">
                            
                                <span
                                    class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500"
                                >
                                    ₹
                                </span>
                            
                                <input
                                    id="product-price"
                                    v-model.number="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    class="w-full rounded-xl border border-gray-300 bg-white py-3 pl-8 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-gray-500 focus:ring-4 focus:ring-gray-100"
                                />
                            
                            </div>
                        </div>
                    
                    
                        <!-- Stock -->
                        <div>
                            <label
                                for="product-stock"
                                class="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Stock
                            </label>
                        
                            <input
                                id="product-stock"
                                v-model.number="stock"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="0"
                                class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-gray-500 focus:ring-4 focus:ring-gray-100"
                            />
                        </div>
                    
                    </div>
                
                
                    <!-- Unit -->
                    <div>
                        <label
                            for="product-unit"
                            class="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Unit
                        </label>
                    
                        <input
                            id="product-unit"
                            v-model="unit"
                            type="text"
                            placeholder="e.g. liter, kg, 250g, piece"
                            class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-gray-500 focus:ring-4 focus:ring-gray-100"
                        />
                    </div>
                
                
                    <!-- Category -->
                    <div>
                        <label
                            class="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Category
                        </label>
                    
                        <div
                            class="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                        >
                            <span class="text-sm font-medium text-gray-800">
                                {{ category }}
                            </span>
                        
                            <span class="text-xs text-gray-400">
                                Selected
                            </span>
                        </div>
                    </div>
                
                
                    <!-- Error -->
                    <div
                        v-if="error"
                        class="rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                    >
                        <p class="text-sm font-medium text-red-600">
                            {{ error }}
                        </p>
                    </div>
                
                </div>
            
            
                <!-- Footer -->
                <div
                    class="mt-7 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end"
                >
            
                    <button
                        type="button"
                        class="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        :disabled="loading"
                        @click="closeModal"
                    >
                        Cancel
                    </button>
                
                    <button
                        type="submit"
                        class="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        :disabled="loading"
                    >
                        <Plus class="h-4 w-4" />
                
                        {{ loading ? "Adding..." : "Add Product" }}
                    </button>
                
                </div>
            
            </form>
        
        </div>
    
    </div>
</template>