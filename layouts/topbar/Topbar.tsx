import React from "react";
import { signOut, useSession } from "next-auth/react";
//signOut === 로그아웃 함수 useSession === nextauth에서 user가 로그인되어 있는 지를 알려주는 훅
import DirectMsg from "../../components/DirectMsg";
import Notification from "../../components/Notification";

import styled from "@emotion/styled";
import UserInfo from "../../components/UserInfo";

const Top = styled.div`
  position: absolute;
  width: calc(100% - 80px);
  height: 50px;
  top: 0;
  left: 80px;
  background-color: #f2f7f7;
  border: 1px solid black;
`;

const TopWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  right: 50px;
  top: 10px;
  width: 150px;
  height: 100%;
  cursor: pointer;
`;

const Topbar: React.FC = () => {
  const { data: session, status } = useSession();
  return (
    <Top>
      <TopWrapper>
        <DirectMsg />
        <Notification />
        <UserInfo name={session?.user.name} />
        <button
          onClick={() =>
            signOut({
              callbackUrl: "http://localhost:3000/",
            })
          }
        >
          Sign Out
        </button>
      </TopWrapper>
    </Top>
  );
};
//https://cpro95.tistory.com/611
export default Topbar;
