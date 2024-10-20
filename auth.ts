import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import loginService from "./services/login.service";
import bcrypt from "bcryptjs";

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
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const hashedPassword = await bcrypt.hash(
          credentials.password as string,
          10,
        );

        const user = await loginService(
          credentials.name as string,
          hashedPassword,
        );

        if (!user.token) {
          throw new Error();
        }

        return user;
      },
    }),
  ],
});
