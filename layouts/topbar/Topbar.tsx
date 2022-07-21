import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
//signOut === 로그아웃 함수 useSession === nextauth에서 user가 로그인되어 있는 지를 알려주는 훅
import DirectMsg from "../../components/sub/DirectMsg";
import Notification from "../../components/sub/Notification";

import styled from "@emotion/styled";
import UserInfo from "../../components/sub/UserInfo";

import { useAppSelector } from "../../src/hooks/hooks";

const Top = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 94%;
  min-width: 200px;
  height: 6%;
  min-height: 40px;
  right: 0;
`;

const Container = styled.div`
  width: 12%;
  min-width: 150px;
  max-width: 250px;
  height: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
`;

const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid black;
  margin-left: 4px;
`;

const Topbar: React.FC = () => {
  const { data: session, status } = useSession();
  const userInfo = useAppSelector((state) => state.user.value);

  const [alarmClick, setAlaramClick] = useState<boolean>(false);
  const [msgClick, setMsgClick] = useState<boolean>(false);
  const [profileClick, setProfileClick] = useState<boolean>(false);
  return (
    <>
      <Top>
        <Container style={{ width: "8%" }}>
          <DirectMsg />
          <Notification />
        </Container>
        <Container
          onClick={() => setProfileClick(!profileClick)}
          style={{ justifyContent: "center", borderLeft: "0.8px solid #c4c4c4" }}
        >
          {userInfo.name}
          <ProfileImg src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHBg8SBw4PEhATDg0PFRAPEA8ODQ0RFREWFhURExYYKCggGBslHRUfITEhJSkrLi4uFx8zODMtNyg5OisBCgoKDg0OFw8QGjIlHSItNy0tKy4tKzctLy0tKzgtLS0tLSstLi0rNy0tLC0tKy0rOC0tKy03LS0rLTctKy0rN//AABEIAOAA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QANhABAAECAgYIBAUFAQAAAAAAAAECAwQRBSExUWFxEhMiMkGRocEzcoGxNFJiotEUQoLh8SP/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAwIBBAX/xAAdEQEBAQEAAgMBAAAAAAAAAAAAAQIRAzESIUET/9oADAMBAAIRAxEAPwDrAH0XzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe00zVPZiZ5a26nB3KtlE/XKHOu8aBInBXI/s8piWmuiaJ7cTHOMjsOViA64AAAAAAAAAAAAAAAAAAAAAAJ+F0f0ozv6v0+P1Z6OwuURXcjX4Ru4rBLW/yK5x+1jbtxbjKiIjkyBNQeVUxVGVURMcXoCBidHRMZ2NU/l8J5KyqOjOVW10SHj8L1tHSojtR+6FM7/KnrH7FSAqkAAAAAAAAAAAAAAAAAANuEtddfiPDbPKGpYaIo7VU8oZ1eRrM7VlGqNQCC4AAAAACm0hZ6rETlsnXHujLTS1Gdqmd1WXnCrXzexDU5QBpkAAAAAAAAAAAAAAAAWeiPhVfNH2VifomvK5VG+Iny/wCs79N49rMBBYAAAAABE0p+F/ypVCz0tX2KaeOfkrFsekd+wBtgAAAAAAAAAAAAAAAAZ2LnU3YqjwnzhgDroaKorpiadkxm9VOAxfUz0bnd3/l/0tonONSGpxfN7ABl0AAJnKNYrdIYzOJotTzn2h2TrlvEXGXuvvzMbNkcmkF4hQB1wAAAAAAAAAAAAAAAAAASMNjKrGqNdO6fZHHLOuy8XNrHUXNs5Tun+UiKoq2TDniJy2MXxtzyOimctrRdxdFrbVE8I1ypJnPaH8y+RLxOOqvRlR2afWUQG5OMW9AHXAAAAAAAAAAAAAAAAAAAZ2bNV6rK3H8Qs8Po+m3rudqf2s3UjUzarLdmq7P/AJ0zP2Srejaqu/MR6ytYjKNQnd1SYiDToymO9VVPLKGcaOo/V5pY58q18YiTo6jj5sKtGUz3aqo55SnB8qfGKq5oyqO5MT6Si3bNVr4lMx9l+TGca3Zus3Ec6Le/o+m58Pszw2eSsv2KrFWVyPr4SpNSp3NjWA0yAAAAAAAAAAAAAAJGDwk4ic51U79/CHmDw/8AUXOEbZ9l1RTFFMRTGUQxrXPpTOe/by3bi1RlbjKGQIqgAAAAAAADG5RFynKuM4ZAKfGYObE5066fWOaK6GqOlTlVsU2Nw39PX2e7OzhwVzrv1UtZ59xHAUTAAAAAAAAAACmOlVEU7Z1Cbou10rs1TsjZzly3kdk7eLDDWYsWoiPrO+W0HnegAAAAAAAAAAAAYX7UXrUxV4+k72YDnrlE265irbE5PFhpWzlMVRyn2V70S9iFnKAOsgAAAAAAAC60fb6GFp46/NS7XQ0R0aIiPCIhPyVTxx6AkqAAAAAAAAAAAAAA1Yu31uHqjhn9YULo3P3aehdqjdVMeqvjqfkjEBRIAAAAAAABlajO7T80fd0Cgs/Gp+an7r9LyK+MATUAAAAAAAAAAAAAAFHjIyxVfzLxR438XXz9lPH7Y8nppAVRAAAAf//Z" />
        </Container>
      </Top>
      {profileClick && <UserInfo {...userInfo} />}
    </>
  );
};
//https://cpro95.tistory.com/611
export default Topbar;

// {status === "authenticated" ? (
//   <button
//     onClick={() =>
//       signOut({
//         callbackUrl: "http://localhost:3000/",
//       })
//     }
//     style={{ height: "30px" }}
//   >
//     Sign Out
//   </button>
// ) : (
//   <button onClick={() => signIn()} style={{ height: "30px" }}>
//     Sign In
//   </button>
// )}
