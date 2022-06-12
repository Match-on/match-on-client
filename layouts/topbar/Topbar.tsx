import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
//signOut === 로그아웃 함수 useSession === nextauth에서 user가 로그인되어 있는 지를 알려주는 훅
import DirectMsg from "../../components/sub/DirectMsg";
import Notification from "../../components/sub/Notification";

import styled from "@emotion/styled";
import UserInfo from "../../components/sub/UserInfo";

const Top = styled.div`
  position: fixed;
  width: calc(100% - 5em);
  height: 6%;
  top: 0;
  right: 0;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  right: 3.125em;
  top: 0.625em;
  width: 9.375em;
  height: 100%;
  cursor: pointer;
`;

const Topbar: React.FC = () => {
  const { data: session, status } = useSession();
  console.log("top", status);

  return (
    <Top>
      <TopWrapper>
        <DirectMsg />
        <Notification />
        <UserInfo name={session?.user.name} />
        {status === "authenticated" ? (
          <button
            onClick={() =>
              signOut({
                callbackUrl: "http://localhost:3000/",
              })
            }
            style={{ height: "30px" }}
          >
            Sign Out
          </button>
        ) : (
          <button onClick={() => signIn()} style={{ height: "30px" }}>
            Sign In
          </button>
        )}
      </TopWrapper>
    </Top>
  );
};
//https://cpro95.tistory.com/611
export default Topbar;
