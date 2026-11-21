export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: "USER" | "ADMIN";
}
