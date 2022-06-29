import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import RefreshTokenHandler from "../components/sub/auth/refreshTokenHandler";
import Layout from "../layouts/Layout";
import "../styles/globals.css";
import { store } from "../src/redux/store";
import { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

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
  const loading = status === "loading";
  const hasUser = !!session?.user;
  const router = useRouter();
  useEffect(() => {
    if (loading) {
      <div>Loading...</div>;
    }
    if (!hasUser) {
      if (router.asPath !== "/") {
        router.push("/login");
      }
    }
  }, [loading, hasUser]);
  return children;
};
