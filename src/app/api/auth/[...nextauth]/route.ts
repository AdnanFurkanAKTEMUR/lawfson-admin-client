import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

const handler = NextAuth({
  session: {
    strategy: "jwt", // Session'ı JWT ile yönetin
    maxAge: 2 * 60 * 60, // 2 saatlik session süresi
  },

  providers: [
    CredentialsProvider({
      type: "credentials",
      //@ts-ignore
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // Kullanıcı bilgileri doğruysa döndür
        return {
          id: "18",
          userName: "Lawfson",
          email: "lawfson@lawfson.com",
          companyName: "Lawfson",
          companyId: "5",
          role: "superadmin",
          createdAt: "2321312",
          updatedAt: "21323123",
        };
      },
      /*
      async authorize(credentials, req) {
        const { id, userName, email, role, companyName, companyId, createdAt, updatedAt } = credentials as {
          id: number;
          userName: string;
          email: string;
          role: string;
          companyName: string;
          companyId: number;
          createdAt: string;
          updatedAt: string;
        };

        // Kullanıcı bilgileri doğruysa döndür
        return {
          id,
          userName,
          email,
          companyName,
          companyId,
          role,
          createdAt,
          updatedAt,
        };
      },
      */
    }),
  ],

  pages: {
    signIn: "/login", // Giriş yapma sayfası
  },

  callbacks: {
    async jwt({ token, user }: any) {
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
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
