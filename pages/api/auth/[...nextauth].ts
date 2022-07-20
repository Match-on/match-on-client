import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";

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
        id: { label: "Username", type: "text", placeholder: "ID" },
        password: { label: "Password", type: "PW" },
      },
      async authorize(credentials: Record<any, any>, req: NextApiRequest) {
        try {
          const res = await axios.post(API_URL + "auth/login", {
            id: credentials.id,
            password: credentials.password,
          });
          if (res.data.isSuccess) {
            return res.data.result;
          }
          return null;
        } catch (e) {
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
      if (user) {
        token.accessToken = user.token;
        token.userIdx = user.userIdx;
        // token.accessTokenExpiry = user.data.accessTokenExpiry;
        // token.refreshToken = user.data.refreshToken;
      }
      // const shouldRefreshTime = Math.round(token.accessTokenExpiry - 60 * 60 * 1000 - Date.now());
      // if (shouldRefreshTime > 0) {
      //   return Promise.resolve(token);
      // }
      // If the call arrives after 23 hours have passed, we allow to refresh the token.
      // token = refreshAccessToken(token);

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.userIdx = token.userIdx;
      // session.accessTokenExpiry = token.accessTokenExpiry;
      // session.error = token.error;

      return Promise.resolve(session);
    },
  },
});

//https://dev.to/mabaranowski/nextjs-authentication-jwt-refresh-token-rotation-with-nextauthjs-5696
