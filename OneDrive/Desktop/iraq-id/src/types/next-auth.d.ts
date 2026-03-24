import type { DefaultSession } from "next-auth";
import type { Role } from "@prisma/client";

declare module "next-auth" {
  interface User {
    role: Role;
    isActive: boolean;
    /** Serialized in JWT as ISO string */
    subscriptionValidUntil?: Date | string | null;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: Role;
      isActive: boolean;
      subscriptionValidUntil: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    isActive: boolean;
    subscriptionValidUntil: string | null;
  }
}
