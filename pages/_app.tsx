import { getSession, SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import RefreshTokenHandler from "../components/auth/refreshTokenHandler";
import Layout from "../layouts/Layout";
import "../styles/globals.css";
import { store } from "../src/redux/store";
import { useState } from "react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [interval, setInterval] = useState(0);
  return (
    <Provider store={store}>
      <SessionProvider session={session} refetchInterval={interval}>
        {Component.auth ? (
          <Auth>
            <Layout>
              <Component {...pageProps} />
              <RefreshTokenHandler setInterval={setInterval} />
            </Layout>
          </Auth>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SessionProvider>
    </Provider>
  );
}

const Auth = ({ children }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const hasUser = !!session?.user;
  const router = useRouter();
  useEffect(() => {
    console.log("ss", session);
    if (!loading && !hasUser) {
      router.push("/login");
    }
  }, [loading, hasUser]);
  if (loading || !hasUser) {
    return <div>Waiting for session...</div>;
  }
  console.log("child", children);
  console.log("ss", session);

  return children;
};
