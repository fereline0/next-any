import IUser from "./user.interface";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      current?: IUser;
    };
  }
}
