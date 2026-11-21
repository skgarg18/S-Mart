import {jwtDecode} from "jwt-decode";
import type {JwtPayload}  from "../types/jwtTokenContext.ts"

export const authGaurd = (to: any) => {

    // User must be logged in
    const token = localStorage.getItem("token");


    if(to.meta.requiresGuest && token){
        return "/"
    }

    // Public route
    if (!to.meta.requiresAuth) {
        return true;
    }

    
    if (!token) {
        return "/login";
    }

    // Admin route
    if (to.meta.requiresAdmin) {
        const decoded = jwtDecode<JwtPayload>(token);

        if (decoded.role !== "ADMIN") {
            alert("Not authorized");
            return "/";
        }
    }

    // Everything is fine
    return true;
};