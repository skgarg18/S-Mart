import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import CartView from "../views/CartView.vue";

import AdminDashboard from "../views/admin/AdminDashboard.vue";
import AdminCategoryProductsEdit from "../views/admin/AdminCategoryProductsEdit.vue";
import LoginView from "../views/login.vue";
import SignUpView from "../views/signup.vue";

import {authGaurd}  from "./gaurds.ts";




const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: "/",
            component: HomeView
        },
        {
            path: "/cart",
            component: CartView
        },

        // Admin
        {
            path: "/admin",
            component: AdminDashboard,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: "/admin/products/:category",
            name: "admin-category-products",
            component: AdminCategoryProductsEdit,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },

        {
            path: "/login",
            name: "login",
            component: LoginView,
            meta:{
                requiresGuest:true
            }
        },

        {
            path: "/signup",
            name: "signup",
            component: SignUpView,
            meta:{
                requiresGuest:true
            }
        },

    ]
});

router.beforeEach(authGaurd);

export default router;
