import { DefaultSession, type DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the User type
export interface User extends DefaultUser {
  id: string;
  provider?: string;
}

// Extend the session interface
declare module "next-auth" {
  interface Session {
    user?: User;
  }

  interface User {
    id: string;
    provider?: string;
  }
}

// Extend the JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    provider?: string;
  }
}

// User profile in DynamoDB
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  image?: string;
  provider?: string;
  createdAt: string;
  updatedAt?: string;
}

// User updates
export interface UserUpdates {
  name?: string;
  image?: string;
  [key: string]: string | number | boolean | null | undefined;
}
