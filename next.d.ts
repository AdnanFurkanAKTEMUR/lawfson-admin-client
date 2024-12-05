import { DefaultSession, DefaultUser } from "next-auth";
interface IUser extends DefaultUser {
  id: string;
  userName: string;
  email: string;
  role: string;
  companyId: number;
  companyName: string;
  createdAt: string;
  updatedAt: string;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
