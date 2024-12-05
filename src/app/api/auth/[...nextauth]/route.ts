import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { GraphQLClient, gql } from "graphql-request";

const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_URI || "");

const LOGIN_MUTATION = gql`
  mutation AdminUserLogin($input: adminUserLoginInput) {
    adminUserLogin(input: $input) {
      id
      email
      createdAt
      company {
        id
        companyName
      }
      role
      isRoot
      updatedAt
      userName
    }
  }
`;

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 saat
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email ve şifre gereklidir!");
        }

        try {
          const variables = {
            input: {
              email: credentials.email,
              password: credentials.password,
            },
          };
          console.log(credentials);
          const data = await graphqlClient.request(LOGIN_MUTATION, variables);
          //@ts-ignore
          const user = data?.adminUserLogin;
          console.log(user);
          if (user) {
            return {
              id: user.id,
              userName: user.userName,
              email: user.email,
              role: user.role,
              companyId: user.company.id,
              companyName: user.company.companyName,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            };
          }
          return null; // Kullanıcı doğrulama başarısızsa null döner.
        } catch (error) {
          console.error("GraphQL Login Hatası:", error);
          throw new Error("Giriş sırasında bir hata oluştu!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token = {
          ...token,
          id: user.id,
          userName: user.userName,
          role: user.role,
          email: user.email,
          companyName: user.companyName,
          companyId: user.companyId,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          id: token.id,
          userName: token.userName,
          role: token.role,
          email: token.email,
          companyName: token.companyName,
          companyId: token.companyId,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
