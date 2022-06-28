import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest } from "next";

import { useQuery } from "react-query";
import axios from "axios";
import { API_URL } from "../../../components/api/API";

interface User {
  data: { accessToken: string };
}

async function refreshAccessToken(tokenObject) {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await axios.post(API_URL + "auth/refreshToken", {
      token: tokenObject.refreshToken,
    });

    return {
      ...tokenObject,
      accessToken: tokenResponse.data.accessToken,
      accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
      refreshToken: tokenResponse.data.refreshToken,
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "matchOn-credential",
      name: "matchOn-credential",
      credentials: {
        id: { label: "Username", type: "text", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<any, any>, req: NextApiRequest) {
        try {
          //console.log(credentials);

          const user = await axios.post(API_URL + "auth/login", {
            id: credentials.id,
            password: credentials.password,
          });
          console.log("user", user);

          if (user.data.isSuccess) {
            return user.data;
          }

          return null;
        } catch (e) {
          console.log(e);
          throw new Error(e);
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  // 추가
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      // if (user) {
      //   // This will only be executed at login. Each next invocation will skip this part.
      //   token.accessToken = user.data.accessToken;
      //   token.accessTokenExpiry = user.data.accessTokenExpiry;
      //   token.refreshToken = user.data.refreshToken;
      // }
      // // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
      // const shouldRefreshTime = Math.round(token.accessTokenExpiry - 60 * 60 * 1000 - Date.now());
      // // If the token is still valid, just return it.
      // if (shouldRefreshTime > 0) {
      //   return Promise.resolve(token);
      // }
      // // If the call arrives after 23 hours have passed, we allow to refresh the token.
      // token = refreshAccessToken(token);
      // return Promise.resolve(token);

      return token;
    },
    async session({ session, token }) {
      // session.accessToken = token.accessToken;
      // session.accessTokenExpiry = token.accessTokenExpiry;
      // session.error = token.error;

      // return Promise.resolve(session);
      return session;
    },
  },
});

//https://dev.to/mabaranowski/nextjs-authentication-jwt-refresh-token-rotation-with-nextauthjs-5696
