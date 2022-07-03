import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const OnboardingPage = styled.div`
  width: 100%;
`;

const TopLogo = styled.div`
  position: fixed;
  width: 100%;
  height: 8%;
  top: 0;
  border: 1px solid black;
`;
const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 8%;
  margin-top: 5rem;
`;
const MainText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 15rem;
  font-family: "Roboto";
  font-weight: 600;
  font-size: 2.2rem;
`;

const SubText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 35%;
  font-size: 1rem;
  color: #aaaaaa;
  font-weight: 450;
`;

const SignButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 13rem;
  height: 4.625rem;
  font-size: 2rem;
  color: white;
  background-color: #47d2d2;
  border-radius: 10px;
  cursor: pointer;
`;

const Index: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (session && status === "authenticated") {
    router.push("/main");
  }
  return (
    <OnboardingPage>
      <TopLogo>Logo 예정</TopLogo>
      <Container>
        <MainText>
          <div>협업툴의 모든 것</div>
          <div>Match On에서 쉽고 간편하게</div>
          <SubText>
            <p>내 팀원 정보를 파악하고 팀 활동 내용들을 한 번에 정리하세요</p>
            <p>지금껏 협업활동이 불편했다면</p>
            <p>Match On에서 당신의 협업 활동을 편리하게 관리하세요.</p>
          </SubText>
        </MainText>
        <div style={{ display: "flex", justifyContent: "space-around", width: "32rem" }}>
          <SignButton onClick={() => router.push("/register")}>회원가입</SignButton>
          <SignButton onClick={() => router.push("/login")}>로그인</SignButton>
        </div>
      </Container>
    </OnboardingPage>
  );
};

Index.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;

  return { pathname };
};

export default Index;
