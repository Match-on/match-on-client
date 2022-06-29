import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
// import { useAppSelector, useAppDispatch } from "../src/hooks/hooks";
// import { userLogin } from "../src/redux/reducers/user";
// import { RootState } from "../src/redux/store";

const Index: NextPage = () => {
  const { data: session, status } = useSession();

  if (session && status === "authenticated") {
    console.log("session", session);
    return (
      <div style={{ alignContent: "center" }}>
        User index: {session.user.userIdx} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <div>-----------session information-------------</div>
        <div>
          <div>버튼</div>
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
