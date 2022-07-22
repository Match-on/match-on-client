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
  right: 15rem;
`;

const ContentsRow = styled.div<{ index: number }>`
  width: 100%;
  height: 19%;
  background: #ffffff;
  padding: 0.3rem;
  border-bottom: ${(props) => (props.index === 4 ? "none" : "0.5px solid #aaaaaa")};
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #aaaaaa;
  &:hover {
    color: #47d2d2;
  }
`;

const Contents = styled.div`
  width: 100%;
  height: 60%;
  font-size: 0.625rem;
  color: #000000;
`;

const Date = styled.span`
  font-size: 0.5rem;
  &:hover {
    color: #aaaaaa;
  }
`;

const data = [
  { name: "탐사수", data: "어제", detail: "회의 1시간 전입니다." },
  { name: "탐사수", data: "어제", detail: "회의 1시간 전입니다." },
  { name: "탐사수", data: "어제", detail: "회의 1시간 전입니다." },
  { name: "탐사수", data: "어제", detail: "회의 1시간 전입니다." },
  { name: "탐사수", data: "어제", detail: "회의 1시간 전입니다." },
];

const Notification: React.FC = () => {
  return (
    <Container>
      {data.map((v, i) => (
        <ContentsRow key={i} index={i}>
          <Title>
            {v.name}
            <Date>{v.data}</Date>
          </Title>
          <Contents>{v.detail}</Contents>
        </ContentsRow>
      ))}
    </Container>
  );
};

export default Notification;
