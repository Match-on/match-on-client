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
export default function App({ Component, pageProps: { session, ...pageProps } }) {
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
  const [userInfo, setUserInfo] = useState({});
  const loading = status === "loading";
  const hasUser = !!session?.user;
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) {
      <div>Loading...</div>;
    }
    if (!hasUser) {
      if (router.pathname !== "/" && router.pathname.startsWith("/register") === false) {
        router.push("/login");
      }
    }
    if (hasUser) {
      axios
        .get(API_URL + `users/${session.user.userIdx}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data.result);

          dispatch(userLogin(res.data.result));
        })
        .catch((err) => {
          alert("로그인 정보를 불러오는 데 실패했습니다.");
          signOut();
        });
    }
  }, [loading, hasUser]);

  // useEffect(() => {
  //   console.log(userInfo);

  //   //dispatch(userLogin({ userInfo }));
  // }, [userInfo]);

  return children;
};
