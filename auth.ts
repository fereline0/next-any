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

        if (user.error || user.data === null) {
          throw new Error();
        }

        return user.data;
      },
    }),
  ],
  events: {
    async session({ session }) {
      const currentUser = await currentUserService(session.user.token);

      if (currentUser.error || currentUser.data === null) {
        session.user = {
          token: session.user.token,
        };
      } else {
        session.user = {
          token: session.user.token,
          current: currentUser.data,
        };
      }
    },
  },
});
