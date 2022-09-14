import styled from "@emotion/styled";
import { useAppSelector } from "../../src/hooks/hooks";
import { RootState } from "../../src/redux/store";

const MainPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 2% 2% 2%;
`;

const Greeting = styled.div`
  font-size: 1.3rem;
  color: #000000;
  width: 100%;
  height: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;
const MainContents = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 3rem);
`;
const LeftSide = styled.div`
  width: 54%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightSide = styled.div`
  width: 44%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Contents = styled.div`
  width: 100%;
  height: calc(100% - 1.5rem);
  background-color: #ffffff;
  border-radius: 10px;
`;

const SubTitle = styled.div`
  font-size: 0.8rem;
  color: #aaaaaa;
`;

const Main = () => {
  const user = useAppSelector((state: RootState) => state.user.value);
  console.log("redux user", user);

  return (
    <MainPage>
      <Greeting>{user.nickname}님, 안녕하세요</Greeting>
      <MainContents>
        <LeftSide>
          <Container style={{ height: "39%" }}>
            <SubTitle>최근 알림</SubTitle>
            <Contents></Contents>
          </Container>
          <Container style={{ height: "59%" }}>
            <SubTitle>최근 알림</SubTitle>
            <Contents></Contents>
          </Container>
        </LeftSide>
        <RightSide>
          <Container style={{ height: "49%" }}>
            <SubTitle>최근 알림</SubTitle>
            <Contents></Contents>
          </Container>
          <Container style={{ height: "49%" }}>
            <SubTitle>최근 알림</SubTitle>
            <Contents></Contents>
          </Container>
        </RightSide>
      </MainContents>
    </MainPage>
  );
};

export default Main;
