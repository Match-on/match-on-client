import type { NextPage } from "next";
import styled from "@emotion/styled";
import GeneralUser from "../../public/register/Gen_user.svg";
import UnivUser from "../../public/register/Univ_user.svg";
import Check from "../../public/register/Check.svg";

import { useState } from "react";
import Link from "next/link";
const RegisterPage = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  margin: auto;
`;
const Container = styled.div<{ selected: boolean }>`
  width: 30%;
  min-width: 350px;
  max-width: 450px;
  height: 58%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => (props.selected ? "#ffffff" : "#ecf9f4")};
  box-shadow: 0px 0px 5px #000000;
  border-radius: 20px;
  padding: 1%;
`;
const Contents = styled.div`
  width: 96%;
  height: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const Circle = styled.div`
  width: 6rem;
  height: 6rem;
  border: 2px solid #47d2d2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 60%;
  width: 90%;
  font-size: 0.75rem;
  font-weight: 550;
`;

const RegisterButton = styled.button<{ selected: boolean }>`
  width: 90%;
  height: 25%;
  font-size: 1rem;
  font-weight: 700;
  background: ${(props) => (props.selected ? "#47d2d2" : "#ecf9f4")};
  border-radius: 10px;
  color: ${(props) => (props.selected ? "#ffffff" : "#cbcbcb")};
  border: 2px solid #47d2d2;
  cursor: pointer;
`;
const univDescription = [
  "대학교를 등록해 수업 정보를 얻을 수 있어요!",
  "내가 속한 모든 팀을 자유롭게 관리하세요!",
  "스터디, 공모전 정보부터 팀원들 간 화상회의까지!",
];
const genDescription = [
  "다른 유저와 계정 공유로 팀작업을 수월하게!",
  "내가 속한 모든 팀을 자유롭게 관리하세요!",
  "스터디, 공모전, 화상회의까지!",
];

const Register: NextPage = () => {
  const [univSelected, setUnivSelected] = useState<boolean>(true);
  const [genSelected, setGenSelected] = useState<boolean>(false);
  
  return (
    <RegisterPage>
      <Container
        onClick={() => {
          setUnivSelected(true);
          setGenSelected(false);
        }}
        selected={univSelected}
      >
        <Contents>
          <Circle>
            <UnivUser />
          </Circle>
          <div style={{ fontSize: "1.5rem", color: "#47d2d2", fontWeight: "700" }}>대학생 회원</div>
          <div style={{ fontSize: "0.75rem", color: "#adadad" }}>
            <p>소속 대학교와 연동해</p>
            <p>수업 정보를 얻으세요</p>
          </div>
        </Contents>
        <Contents>
          <Description>
            {univDescription.map((v, i) => (
              <div key={`ud-${i}`} style={{ display: "flex" }}>
                <Check />
                <p style={{ marginLeft: "5px" }}>{v}</p>
              </div>
            ))}
          </Description>
          <Link href="/register/university">
            <RegisterButton selected={univSelected}>대학생으로 회원가입</RegisterButton>
          </Link>
        </Contents>
      </Container>
      <Container
        onClick={() => {
          setUnivSelected(false);
          setGenSelected(true);
        }}
        selected={genSelected}
      >
        <Contents>
          <Circle>
            <GeneralUser />
          </Circle>
          <div style={{ fontSize: "1.5rem", color: "#47d2d2", fontWeight: "700" }}>일반 회원</div>
          <div style={{ fontSize: "0.75rem", color: "#adadad" }}>
            <p style={{ textAlign: "center" }}>팀원과 계정을 공유해</p>
            <p>팀 작업을 수월하게 진행하세요</p>
          </div>
        </Contents>
        <Contents>
          <Description>
            {genDescription.map((v, i) => (
              <div key={`gd-${i}`} style={{ display: "flex" }}>
                <Check />
                <p style={{ marginLeft: "5px" }}>{v}</p>
              </div>
            ))}
          </Description>
          <Link href="/register/general">
            <RegisterButton selected={genSelected}>일반으로 회원가입</RegisterButton>
          </Link>
        </Contents>
      </Container>
    </RegisterPage>
  );
};

Register.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};

export default Register;
