import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      role: number;
      createAt: string;
      updateAt: string;
      image: string;
      token: string;
    };
  }
}
