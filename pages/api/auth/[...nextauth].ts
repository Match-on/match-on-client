import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { NextApiRequest } from "next";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "matchOn-credential",
      name: "matchOn-credential",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<any, any>, req: NextApiRequest) {
        const email = credentials.email;
        const password = credentials.password;
        if (email === "test@test.com" && password === "test") {
          console.log("crede", credentials);
          return credentials;
        }
        throw new Error("아이디 혹은 패스워드가 틀립니다.");
      },
    }),
  ],
  secret: process.env.SECRET,
  // 추가
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
    async session({ session, user, token }) {
      return session;
    },
  },
});

//참고 블로그 https://birdmee.tistory.com/33
