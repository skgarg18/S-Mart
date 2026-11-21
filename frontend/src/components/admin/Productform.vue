<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const description = ref("");
const price = ref("");
const stock = ref("");
const unit = ref("");
const category = ref("");

function submitForm() {
    console.log({
        name: name.value,
        description: description.value,
        price: price.value,
        stock: stock.value,
        unit: unit.value,
        category: category.value
    });
}
</script>

<template>
    <form
        class="space-y-5 rounded-xl border bg-white p-6"
        @submit.prevent="submitForm"
    >

        <div>
            <label class="mb-1 block text-sm font-medium">
                Product Name
            </label>

            <input
                v-model="name"
                type="text"
                class="w-full rounded-lg border px-3 py-2"
                placeholder="Apple"
            />
        </div>

        <div>
            <label class="mb-1 block text-sm font-medium">
                Description
            </label>

            <textarea
                v-model="description"
                class="w-full rounded-lg border px-3 py-2"
                rows="3"
            />
        </div>

        <div class="grid grid-cols-2 gap-4">

            <div>
                <label class="mb-1 block text-sm font-medium">
                    Price
                </label>

                <input
                    v-model="price"
                    type="number"
                    class="w-full rounded-lg border px-3 py-2"
                />
            </div>

            <div>
                <label class="mb-1 block text-sm font-medium">
                    Stock
                </label>

                <input
                    v-model="stock"
                    type="number"
                    class="w-full rounded-lg border px-3 py-2"
                />
            </div>

        </div>

        <div class="grid grid-cols-2 gap-4">

            <div>
                <label class="mb-1 block text-sm font-medium">
                    Unit
                </label>

                <input
                    v-model="unit"
                    type="text"
                    class="w-full rounded-lg border px-3 py-2"
                    placeholder="kg"
                />
            </div>

            <div>
                <label class="mb-1 block text-sm font-medium">
                    Category
                </label>

                <input
                    v-model="category"
                    type="text"
                    class="w-full rounded-lg border px-3 py-2"
                    placeholder="Fruits"
                />
            </div>

        </div>

        <button
            type="submit"
            class="w-full rounded-lg bg-black px-4 py-2.5 font-medium text-white hover:bg-gray-800"
        >
            Save Product
        </button>

    </form>
</template>