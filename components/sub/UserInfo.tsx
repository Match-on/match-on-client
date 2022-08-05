import styled from "@emotion/styled";
import { signOut } from "next-auth/react";
import React from "react";

import Setting from "../../public/topbarSVG/AccountSetting.svg";
import LogOut from "../../public/topbarSVG/LogOut.svg";

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
  const SignOut = () => {
    signOut({
      callbackUrl: "http://localhost:3000/",
    });
  };
  return (
    <Container>
      <UpperDesign />
      <ProfileImg src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHBg8SBw4PEhATDg0PFRAPEA8ODQ0RFREWFhURExYYKCggGBslHRUfITEhJSkrLi4uFx8zODMtNyg5OisBCgoKDg0OFw8QGjIlHSItNy0tKy4tKzctLy0tKzgtLS0tLSstLi0rNy0tLC0tKy0rOC0tKy03LS0rLTctKy0rN//AABEIAOAA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QANhABAAECAgYIBAUFAQAAAAAAAAECAwQRBSExUWFxEhMiMkGRocEzcoGxNFJiotEUQoLh8SP/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAwIBBAX/xAAdEQEBAQEAAgMBAAAAAAAAAAAAAQIRAzESIUET/9oADAMBAAIRAxEAPwDrAH0XzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe00zVPZiZ5a26nB3KtlE/XKHOu8aBInBXI/s8piWmuiaJ7cTHOMjsOViA64AAAAAAAAAAAAAAAAAAAAAAJ+F0f0ozv6v0+P1Z6OwuURXcjX4Ru4rBLW/yK5x+1jbtxbjKiIjkyBNQeVUxVGVURMcXoCBidHRMZ2NU/l8J5KyqOjOVW10SHj8L1tHSojtR+6FM7/KnrH7FSAqkAAAAAAAAAAAAAAAAAANuEtddfiPDbPKGpYaIo7VU8oZ1eRrM7VlGqNQCC4AAAAACm0hZ6rETlsnXHujLTS1Gdqmd1WXnCrXzexDU5QBpkAAAAAAAAAAAAAAAAWeiPhVfNH2VifomvK5VG+Iny/wCs79N49rMBBYAAAAABE0p+F/ypVCz0tX2KaeOfkrFsekd+wBtgAAAAAAAAAAAAAAAAZ2LnU3YqjwnzhgDroaKorpiadkxm9VOAxfUz0bnd3/l/0tonONSGpxfN7ABl0AAJnKNYrdIYzOJotTzn2h2TrlvEXGXuvvzMbNkcmkF4hQB1wAAAAAAAAAAAAAAAAAASMNjKrGqNdO6fZHHLOuy8XNrHUXNs5Tun+UiKoq2TDniJy2MXxtzyOimctrRdxdFrbVE8I1ypJnPaH8y+RLxOOqvRlR2afWUQG5OMW9AHXAAAAAAAAAAAAAAAAAAAZ2bNV6rK3H8Qs8Po+m3rudqf2s3UjUzarLdmq7P/AJ0zP2Srejaqu/MR6ytYjKNQnd1SYiDToymO9VVPLKGcaOo/V5pY58q18YiTo6jj5sKtGUz3aqo55SnB8qfGKq5oyqO5MT6Si3bNVr4lMx9l+TGca3Zus3Ec6Le/o+m58Pszw2eSsv2KrFWVyPr4SpNSp3NjWA0yAAAAAAAAAAAAAAJGDwk4ic51U79/CHmDw/8AUXOEbZ9l1RTFFMRTGUQxrXPpTOe/by3bi1RlbjKGQIqgAAAAAAADG5RFynKuM4ZAKfGYObE5066fWOaK6GqOlTlVsU2Nw39PX2e7OzhwVzrv1UtZ59xHAUTAAAAAAAAAACmOlVEU7Z1Cbou10rs1TsjZzly3kdk7eLDDWYsWoiPrO+W0HnegAAAAAAAAAAAAYX7UXrUxV4+k72YDnrlE265irbE5PFhpWzlMVRyn2V70S9iFnKAOsgAAAAAAAC60fb6GFp46/NS7XQ0R0aIiPCIhPyVTxx6AkqAAAAAAAAAAAAAA1Yu31uHqjhn9YULo3P3aehdqjdVMeqvjqfkjEBRIAAAAAAABlajO7T80fd0Cgs/Gp+an7r9LyK+MATUAAAAAAAAAAAAAAFHjIyxVfzLxR438XXz9lPH7Y8nppAVRAAAAf//Z" />
      <LowerDesign>
        {props.nickname}
        <LowerDiv style={{ justifyContent: "center" }}>
          <LowerText>중앙대학교</LowerText>
          <LowerText>{props.email}</LowerText>
        </LowerDiv>
        <LowerDiv style={{ textAlign: "left", borderTop: "0.5px solid #aaaaaa" }}>
          <LowerText style={{ width: "45%", justifyContent: "space-evenly" }}>
            <Setting />
            계정설정
          </LowerText>
          <LowerText onClick={SignOut} style={{ width: "45%", justifyContent: "space-evenly", cursor: "pointer" }}>
            <LogOut />
            로그아웃
          </LowerText>
        </LowerDiv>
      </LowerDesign>
    </Container>
  );
};

export default UserInfo;
