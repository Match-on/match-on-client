import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "../src/hooks/hooks";
import { userLogin } from "../src/redux/reducers/user";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { RootState } from "../src/redux/store";

const Index: NextPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.value);
  if (session) {
    console.log("session", session);
    console.log("user in store", user);

    return (
      <div style={{ alignContent: "center" }}>
        <div>-----------session information-------------</div>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <div>-----------session information-------------</div>
        <div>
          <p>name:{user.name}</p>
          <p>age:{user.age}</p>
          <p>email:{user.email}</p>
          <div onClick={() => dispatch(userLogin({ name: "조성훈", age: 25, email: "bbb@bbb.bbb" }))}>버튼</div>
        </div>
      </div>
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
