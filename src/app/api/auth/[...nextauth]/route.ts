import CredentialsProvider from "next-auth/providers/credentials";
import argon2 from "argon2";
import NextAuth from "next-auth/next";
// import dotenv from "dotenv";
// dotenv.config();

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },

  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      //@ts-ignore
      async authorize(credantials, req) {
        const { _id, name, surname, role, createdAt, updatedAt } = credantials as {
          _id: string;
          name: string;
          surname: string;
          role: number;
          createdAt: string;
          updatedAt: string;
        };
        return { _id, name, surname, role, createdAt, updatedAt };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, session, trigger }: any) {
      // if (trigger == "update" && session) {
      //   token.name = session.name;
      //   token.email = session.email;
      //   token.role = session.role;
      // }
      if (user) {
        token._id = user._id;
        token.name = user.name;
        token.role = user.role;
        token.surname = user.surname;
        token.updatedAt = user.updatedAt;
        token.createdAt = user.createdAt;
      }
      return token;
    },
    session({ session, token }: any) {
      if (token && session.user) {
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.surname = token.surname;
        session.user.updatedAt = token.updatedAt;
        session.user.createdAt = token.createdAt;
        session.accessToken = token;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
