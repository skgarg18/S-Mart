
<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const emailError = ref("");
const passwordError = ref("");

const props = defineProps<{
  errorMessage: string;
}>();

const emit = defineEmits<{
  signup: [name: string, email: string, password: string];
}>();

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.value) {
    emailError.value = "Email is required";
    return false;
  }

  if (!emailRegex.test(email.value)) {
    emailError.value = "Please enter a valid email address";
    return false;
  }

  emailError.value = "";
  return true;
};

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = "Password is required";
    return false;
  }

  if (password.value.length < 8) {
    passwordError.value = "Password must be at least 8 characters";
    return false;
  }

  if (password.value !== confirmPassword.value) {
    passwordError.value = "Passwords do not match";
    return false;
  }

  passwordError.value = "";
  return true;
};

const handleSignUp = () => {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (!isEmailValid || !isPasswordValid) {
    return;
  }

  emit(
    "signup",
    name.value,
    email.value,
    password.value
  );
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Create Account
        </h1>

        <p class="text-gray-500 mt-2">
          Sign up to get started with Mart
        </p>
      </div>

      <p v-if="props.errorMessage" class="text-red-500 text-sm text-center">
        {{ props.errorMessage }}
      </p>

      <!-- Form -->
      <form @submit.prevent="handleSignUp" class="space-y-5">

        <!-- Name -->
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>

          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Enter your name"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg
                   outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500 transition"
          />
        </div>

        <!-- Email -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>

          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
            @blur="validateEmail"
            class="w-full px-4 py-3 border rounded-lg
                   outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500 transition"
            :class="emailError ? 'border-red-500' : 'border-gray-300'"
          />

          <p
            v-if="emailError"
            class="text-red-500 text-sm mt-1"
          >
            {{ emailError }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>

          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Create a password"
              required
              @input="validatePassword"
              class="w-full px-4 py-3 pr-12 border rounded-lg
                     outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
              :class="passwordError ? 'border-red-500' : 'border-gray-300'"
            />

            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2
                     text-gray-500 hover:text-gray-700"
            >
              {{ showPassword ? "🙈" : "👁️" }}
            </button>
          </div>
        </div>

        <!-- Confirm Password -->
        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>

          <div class="relative">
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm your password"
              required
              @input="validatePassword"
              class="w-full px-4 py-3 pr-12 border rounded-lg
                     outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
              :class="passwordError ? 'border-red-500' : 'border-gray-300'"
            />

            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2
                     text-gray-500 hover:text-gray-700"
            >
              {{ showConfirmPassword ? "🙈" : "👁️" }}
            </button>
          </div>

          <p
            v-if="passwordError"
            class="text-red-500 text-sm mt-1"
          >
            {{ passwordError }}
          </p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg
                 font-semibold hover:bg-blue-700
                 transition duration-200
                 cursor-pointer"
        >
          Create Account
        </button>

      </form>

      <!-- Login -->
      <p class="text-center text-sm text-gray-500 mt-6">
        Already have an account?

        <a
          href="/login"
          class="text-blue-600 font-medium hover:underline"
        >
          Log in
        </a>
      </p>

    </div>
  </div>
</template>

