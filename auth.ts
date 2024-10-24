import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import loginService from "./services/login.service";
import currentUserService from "./services/currentUser.service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);

      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: { ...session.user, ...user, ...token.user! },
      };
    },
  },
  providers: [
    Credentials({
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await loginService(
          credentials.login as string,
          credentials.password as string,
        );

        if (!user.token) {
          throw new Error();
        }

        return user;
      },
    }),
  ],
  events: {
    async session({ session }) {
      try {
        const currentUser = await currentUserService(session.user.token);

        session.user = {
          token: session.user.token,
          current: currentUser,
        };
      } catch {
        session.user = {
          token: session.user.token,
        };
      }
    },
  },
});
