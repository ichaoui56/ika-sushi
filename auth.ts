import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { UserRole } from "@prisma/client";
import { prisma } from "./lib/prisma";
import { normalizePhoneNumber } from "./features/auth/schemas";
import { clearLoginAttempts, consumeLoginAttempt } from "./lib/auth/rate-limit";
import { verifyPassword } from "./lib/auth/password";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email or phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const identifier =
          typeof credentials.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials.password === "string" ? credentials.password : "";

        if (!identifier || !password) return null;

        const isEmail = identifier.includes("@");
        const normalizedPhone = normalizePhoneNumber(identifier);
        const attemptKey = isEmail ? identifier : normalizedPhone;
        if (!attemptKey || !(await consumeLoginAttempt(attemptKey))) return null;

        const user = await prisma.user.findFirst({
          where: isEmail
            ? { email: { equals: identifier, mode: "insensitive" } }
            : { normalizedPhone },
        });

        if (
          !user ||
          user.status !== "ACTIVE" ||
          !user.passwordHash ||
          !(await verifyPassword(user.passwordHash, password))
        ) {
          return null;
        }

        await clearLoginAttempts(attemptKey);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (
        session.user &&
        typeof token.id === "string" &&
        Object.values(UserRole).includes(token.role as UserRole)
      ) {
        session.user.id = token.id;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
});