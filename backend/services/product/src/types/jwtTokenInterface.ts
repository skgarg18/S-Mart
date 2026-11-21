export interface JwtPayload {
    userId: number;
    role: "USER" | "ADMIN";
}