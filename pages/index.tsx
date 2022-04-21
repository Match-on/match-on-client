import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Index: NextPage = () => {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default Index;
