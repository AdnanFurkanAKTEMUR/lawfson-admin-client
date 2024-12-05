import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
// import dotenv from "dotenv";
// dotenv.config();

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      //@ts-ignore
      async authorize(credantials, req) {
        const { id, userName, email, role, companyName, companyId, createdAt, updatedAt } = credantials as {
          id: number;
          userName: string;
          email: string;
          role: string;
          companyName: string;
          companyId: number;
          createdAt: string;
          updatedAt: string;
        };
        return { id, userName, email, companyName, companyId, role, createdAt, updatedAt };
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
        token.id = user.id;
        token.userName = user.userName;
        token.role = user.role;
        token.email = user.email;
        token.companyName = user.companyName;
        token.companyId = user.companyId;
        token.updatedAt = user.updatedAt;
        token.createdAt = user.createdAt;
      }
      return token;
    },
    session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.userName = token.userName;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.companyName = token.companyName;
        session.user.companyId = token.companyId;
        session.user.updatedAt = token.updatedAt;
        session.user.createdAt = token.createdAt;
        session.accessToken = token;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
