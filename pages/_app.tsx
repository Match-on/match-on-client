import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import RefreshTokenHandler from "../components/sub/auth/refreshTokenHandler";
import Layout from "../layouts/Layout";
import "../styles/globals.css";
import { store } from "../src/redux/store";
import { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { useAppDispatch } from "../src/hooks/hooks";
import { userLogin } from "../src/redux/reducers/user";
import axios from "axios";
import { API_URL } from "../components/api/API";

export default function App({ Component, data, pageProps: { session, ...pageProps } }) {
  const queryClient = new QueryClient();

  const [interval, setInterval] = useState(0);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session} refetchInterval={interval}>
          <Auth>
            {(pageProps && pageProps.pathname) === "/login" ||
            (pageProps && pageProps.pathname) === "/" ||
            (pageProps && pageProps.pathname) === "/register" ? (
              <Component {...pageProps} />
            ) : (
              <Layout>
                <Component {...pageProps} />
                <RefreshTokenHandler setInterval={setInterval} />
              </Layout>
            )}
          </Auth>
        </SessionProvider>
      </QueryClientProvider>
    </Provider>
  );
}

const Auth = ({ children }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const hasUser = !!session?.user;
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("load", loading);
    console.log("hasuser", hasUser);

    if (loading) {
      <div>Loading...</div>;
    }
    // if (!hasUser && !loading) {
    //   if (router.pathname !== "/" && !router.pathname.startsWith("/register")) {
    //     router.push("/login");
    //   }
    // }
    if (hasUser) {
      axios
        .get(API_URL + `users/${session.user.userIdx}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((res) => {
          console.log("user", res);
          dispatch(userLogin(res.data.result));
        })
        .catch((err) => {
          alert("로그인 정보를 불러오는 데 실패했습니다.");
          signOut();
        });
    }
  }, [loading, hasUser]);

  return children;
};

// Auth.getInitialProps = ({ req }) => {
//   const cookies =
// };
//https://velog.io/@bigbrothershin/Next.js-SSR-cookie-%EB%84%A3%EC%96%B4%EC%A3%BC%EA%B8%B0
//https://develogger.kro.kr/blog/LKHcoding/133
