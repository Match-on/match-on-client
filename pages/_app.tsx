import { getSession, SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

import Layout from "../layouts/Layout";
import "../styles/globals.css";
import { store } from "../src/redux/store";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {Component.auth ? (
          <Auth>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Auth>
        ) : (
          <Layout>
            <div>{session}</div>
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
