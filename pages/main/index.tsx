import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL } from "../../components/api/API";
import CalendarMain from "../../components/Main/CalendarMain";
import FavoriteTeam from "../../components/Main/FavoriteTeam";
import RecentAlarm from "../../components/Main/RecentAlarm";
import {
  EmptyBox,
  MainProjectBox,
} from "../../components/myprojects/components/BoxContainer";
import { useAppSelector } from "../../src/hooks/hooks";
import { RootState } from "../../src/redux/store";

interface Noti {
  index: number;
  teamIdx: number;
  type: string;
  writer: string;
  createdAt: string;
}
interface FavoriteTeamProps {
  teamIdx: number;
  name: string;
  description: string;
  type: string;
  deadline: string;
  createdAt: string;
  favorite: number;
  memberCount: number;
}
interface Schedule {
  scheduleIdx: number;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
  member: { name: string };
}
interface UserMainProps {
  noti: Noti[];
  favoriteTeam: FavoriteTeamProps[];
  schedule: { month: Schedule[]; today: Schedule[] };
  dm: [];
}

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
  background-color: #ffffff;
  border-radius: 10px;
  background-color: #ffffff;
  border-radius: 0.625rem;
  width: 100%;
  height: calc(100% - 2rem);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
const FavoriteTeamWrapper = styled.div`
  width: 100%;
  height: calc(100% - 2rem);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
`;

const SubTitle = styled.div`
  font-size: 0.8rem;
  color: #aaaaaa;
`;

const Main = () => {
  const user = useAppSelector((state: RootState) => state.user.value);
  const { data: session, status } = useSession();
  const [userMain, setUserMain] = useState<UserMainProps>({
    noti: [],
    favoriteTeam: [],
    schedule: { month: [], today: [] },
    dm: [],
  });
  const getUserMain = async () => {
    try {
      const res = await axios.get(API_URL + `users/${user.userIdx}/main`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      console.log("userMain", res.data.result);
      setUserMain(res.data.result);
    } catch (err) {
      console.log(err.response);
    }
  };
  useEffect(() => {
    if (session?.user && user.userIdx !== null) getUserMain();
  }, [session, user]);

  return (
    <MainPage>
      <Greeting>{user.nickname}님, 안녕하세요</Greeting>
      <MainContents>
        <LeftSide>
          <Container style={{ height: "39%" }}>
            <SubTitle>최근 알림</SubTitle>
            <Contents>
              <RecentAlarm noti={userMain.noti} />
            </Contents>
          </Container>
          <Container style={{ height: "59%" }}>
            <SubTitle>즐겨찾기</SubTitle>
            <FavoriteTeamWrapper>
              {userMain.favoriteTeam.map((v, i) => (
                <Link
                  href={`/myproject/${v.teamIdx}?tabNum=0`}
                  key={`main_favorite_${i}`}
                >
                  <a>
                    <MainProjectBox {...v} />
                  </a>
                </Link>
              ))}
              {userMain.favoriteTeam.length < 6 && (
                <Link href={`/myproject`}>
                  <a>
                    <EmptyBox style={{ fontSize: "5rem" }}>+</EmptyBox>
                  </a>
                </Link>
              )}
            </FavoriteTeamWrapper>
          </Container>
        </LeftSide>
        <RightSide>
          <Container style={{ height: "49%" }}>
            <SubTitle>달력</SubTitle>
            <Contents>
              <CalendarMain
                todaySchedule={userMain.schedule.today}
                monthSchedule={userMain.schedule.month}
              />
            </Contents>
          </Container>
          <Container style={{ height: "49%" }}>
            <SubTitle>DM</SubTitle>
            <Contents></Contents>
          </Container>
        </RightSide>
      </MainContents>
    </MainPage>
  );
};

export default Main;
