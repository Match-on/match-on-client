import React from "react";

import styled from "@emotion/styled";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 14rem;
  height: 19rem;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 1;
  top: 3.2rem;
  right: 12rem;
`;

const ContentsRow = styled.div<{ index: number }>`
  width: 100%;
  height: 19%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 0.3rem;
  border-bottom: ${(props) => (props.index === 4 ? "none" : "0.5px solid #aaaaaa")};
`;

const UserName = styled.div`
  font-size: 0.75rem;
  color: #aaaaaa;
`;

const Contents = styled.div`
  width: 80%;
  font-size: 0.625rem;
  color: #000000;
`;

const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid white;
  margin-left: 8px;
  &:hover {
    cursor: pointer;
  }
`;

const data = [
  { name: "Match-On", msg: "새로운 메세지를 확인하세요" },
  { name: "Match-On", msg: "새로운 메세지를 확인하세요" },
  { name: "Match-On", msg: "새로운 메세지를 확인하세요" },
  { name: "Match-On", msg: "새로운 메세지를 확인하세요" },
  { name: "Match-On", msg: "새로운 메세지를 확인하세요" },
];

const DirectMsg: React.FC = () => {
  return (
    <Container>
      {data.map((v, i) => (
        <ContentsRow key={i} index={i}>
          <ProfileImg src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHBg8SBw4PEhATDg0PFRAPEA8ODQ0RFREWFhURExYYKCggGBslHRUfITEhJSkrLi4uFx8zODMtNyg5OisBCgoKDg0OFw8QGjIlHSItNy0tKy4tKzctLy0tKzgtLS0tLSstLi0rNy0tLC0tKy0rOC0tKy03LS0rLTctKy0rN//AABEIAOAA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QANhABAAECAgYIBAUFAQAAAAAAAAECAwQRBSExUWFxEhMiMkGRocEzcoGxNFJiotEUQoLh8SP/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAwIBBAX/xAAdEQEBAQEAAgMBAAAAAAAAAAAAAQIRAzESIUET/9oADAMBAAIRAxEAPwDrAH0XzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe00zVPZiZ5a26nB3KtlE/XKHOu8aBInBXI/s8piWmuiaJ7cTHOMjsOViA64AAAAAAAAAAAAAAAAAAAAAAJ+F0f0ozv6v0+P1Z6OwuURXcjX4Ru4rBLW/yK5x+1jbtxbjKiIjkyBNQeVUxVGVURMcXoCBidHRMZ2NU/l8J5KyqOjOVW10SHj8L1tHSojtR+6FM7/KnrH7FSAqkAAAAAAAAAAAAAAAAAANuEtddfiPDbPKGpYaIo7VU8oZ1eRrM7VlGqNQCC4AAAAACm0hZ6rETlsnXHujLTS1Gdqmd1WXnCrXzexDU5QBpkAAAAAAAAAAAAAAAAWeiPhVfNH2VifomvK5VG+Iny/wCs79N49rMBBYAAAAABE0p+F/ypVCz0tX2KaeOfkrFsekd+wBtgAAAAAAAAAAAAAAAAZ2LnU3YqjwnzhgDroaKorpiadkxm9VOAxfUz0bnd3/l/0tonONSGpxfN7ABl0AAJnKNYrdIYzOJotTzn2h2TrlvEXGXuvvzMbNkcmkF4hQB1wAAAAAAAAAAAAAAAAAASMNjKrGqNdO6fZHHLOuy8XNrHUXNs5Tun+UiKoq2TDniJy2MXxtzyOimctrRdxdFrbVE8I1ypJnPaH8y+RLxOOqvRlR2afWUQG5OMW9AHXAAAAAAAAAAAAAAAAAAAZ2bNV6rK3H8Qs8Po+m3rudqf2s3UjUzarLdmq7P/AJ0zP2Srejaqu/MR6ytYjKNQnd1SYiDToymO9VVPLKGcaOo/V5pY58q18YiTo6jj5sKtGUz3aqo55SnB8qfGKq5oyqO5MT6Si3bNVr4lMx9l+TGca3Zus3Ec6Le/o+m58Pszw2eSsv2KrFWVyPr4SpNSp3NjWA0yAAAAAAAAAAAAAAJGDwk4ic51U79/CHmDw/8AUXOEbZ9l1RTFFMRTGUQxrXPpTOe/by3bi1RlbjKGQIqgAAAAAAADG5RFynKuM4ZAKfGYObE5066fWOaK6GqOlTlVsU2Nw39PX2e7OzhwVzrv1UtZ59xHAUTAAAAAAAAAACmOlVEU7Z1Cbou10rs1TsjZzly3kdk7eLDDWYsWoiPrO+W0HnegAAAAAAAAAAAAYX7UXrUxV4+k72YDnrlE265irbE5PFhpWzlMVRyn2V70S9iFnKAOsgAAAAAAAC60fb6GFp46/NS7XQ0R0aIiPCIhPyVTxx6AkqAAAAAAAAAAAAAA1Yu31uHqjhn9YULo3P3aehdqjdVMeqvjqfkjEBRIAAAAAAABlajO7T80fd0Cgs/Gp+an7r9LyK+MATUAAAAAAAAAAAAAAFHjIyxVfzLxR438XXz9lPH7Y8nppAVRAAAAf//Z" />
          <div style={{ width: "80%", display: "flex", flexDirection: "column" }}>
            <UserName>{v.name}</UserName>
            <Contents>{v.msg}</Contents>
          </div>
        </ContentsRow>
      ))}
    </Container>
  );
};

export default DirectMsg;
