import styled from "@emotion/styled";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

import Setting from "../../public/topbarSVG/AccountSetting.svg";
import LogOut from "../../public/topbarSVG/LogOut.svg";
import { useAppSelector } from "../../src/hooks/hooks";
import { RootState } from "../../src/redux/store";
import ProfileImage from "./ProfileImage";
interface UserInformation {
  accessedAt: string;
  createdAt: string;
  email: string;
  emailAgree: boolean;
  id: string;
  name: string;
  nickname: string;
  phone: string;
  profileUrl: string | null;
  userIdx: number;
}

const Container = styled.div`
  position: absolute;
  width: 10rem;
  height: 12.5rem;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 1;
  right: 2rem;
  top: 3.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`; //topbar 너비를 확정 지어야 할듯
const ProfileImg = styled.img`
  position: absolute;
  left: 3.3rem;
  top: 1.3rem;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
  border: 1px solid black;
`;
const UpperDesign = styled.div`
  width: 100%;
  height: 24%;
  background: #47d2d2;
  border-radius: 10px 10px 0 0;
`;

const LowerDesign = styled.div`
  width: 100%;
  height: calc(76% - 1.8rem);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const LowerDiv = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const LowerText = styled.p`
  width: 100%;
  font-size: 0.625rem;
  color: #aaaaaa;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserInfo: React.FC<UserInformation> = (props) => {
  const router = useRouter();
  const SignOut = () => {
    signOut({
      callbackUrl: "http://localhost:3000/",
    });
  };
  const profileSrc = useAppSelector(
    (state: RootState) => state.user.value.profileUrl
  );

  return (
    <Container>
      <UpperDesign />
      <div style={{ position: "absolute", top: "1.3rem", left: "3.3rem" }}>
        <ProfileImage size={[50, 50]} mode="top" imageUrl={profileSrc} />
      </div>
      <LowerDesign>
        {props.nickname}
        <LowerDiv style={{ justifyContent: "center" }}>
          <LowerText>중앙대학교</LowerText>
          <LowerText>{props.email}</LowerText>
        </LowerDiv>
        <LowerDiv
          style={{ textAlign: "left", borderTop: "0.5px solid #aaaaaa" }}
        >
          <LowerText
            onClick={() => {
              router.push("/setting");
            }}
            style={{
              width: "45%",
              justifyContent: "space-evenly",
              cursor: "pointer",
            }}
          >
            <Setting />
            계정설정
          </LowerText>
          <LowerText
            onClick={SignOut}
            style={{
              width: "45%",
              justifyContent: "space-evenly",
              cursor: "pointer",
            }}
          >
            <LogOut />
            로그아웃
          </LowerText>
        </LowerDiv>
      </LowerDesign>
    </Container>
  );
};

export default UserInfo;
