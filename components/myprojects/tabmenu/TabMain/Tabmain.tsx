import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import axios from "axios";
import { API_URL } from "../../../api/API";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Dday from "./components/Dday";
import CalendarMain from "./components/CalendarMain";
import MemberProfile from "./components/MemberProfile";
import RecentAlarm from "./components/RecentAlarm";
interface Noti {
  index: number;
  type: string;
  writer: string;
  createdAt: string;
}
interface Schedule {
  scheduleIdx: number;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
  member: { name: string };
}
interface dDay {
  scheduleIdx: number;
  title: string;
  startTime: string;
  dDay: string;
}
interface Member {
  memberIdx: number;
  profileUrl: string;
  name: string;
  detail: string;
  isMe: string;
  memos: { memoIdx: number; memo: string }[];
}
interface MainProps {
  noti: Noti[];
  schedule: { month: Schedule[]; today: Schedule[] };
  dDay: dDay[];
  members: Member[];
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 1%;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 72%;
  height: 100%;
`;

const RightContainer = styled.div`
  width: 28%;
  margin-left: 2%;
  height: 100%;
`;

const AlarmDday = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 32%;
`;

const AlarmLeft = styled.div`
  width: 75%;
  height: 100%;
`;

const AlarmRight = styled.div`
  width: 22%;
  height: 100%;
`;

const CalendarContainer = styled.div`
  width: 100%;
  height: 65%;
`;

const WhiteBox = styled.div`
  background-color: #ffffff;
  border-radius: 0.625rem;
  width: 100%;
  height: 95%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const TeamMain = () => {
  const router = useRouter();
  const { projectIdx, projectPostIdx } = router.query;
  const { data: session, status } = useSession();
  const [teamMain, setTeamMain] = useState<MainProps>({
    noti: [],
    schedule: { month: [], today: [] },
    dDay: [],
    members: [],
  });
  const getTeamMain = async () => {
    try {
      const res = await axios.get(API_URL + `teams/${projectIdx}/main`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      console.log("teamMain", res.data.result);
      setTeamMain(res.data.result);
    } catch (err) {
      console.log(err.response);
    }
  };
  useEffect(() => {
    if (session?.user) getTeamMain();
  }, [session]);
  return (
    <Container>
      <LeftContainer>
        <AlarmDday>
          <AlarmLeft>
            <div style={{ fontSize: "1rem", color: "#aaaaaa" }}>최근 알람</div>
            <WhiteBox>
              <RecentAlarm noti={teamMain.noti} />
            </WhiteBox>
          </AlarmLeft>
          <AlarmRight>
            <div style={{ fontSize: "1rem", color: "#aaaaaa" }}>D-day</div>
            <WhiteBox>
              <Dday />
            </WhiteBox>
          </AlarmRight>
        </AlarmDday>
        <CalendarContainer>
          <div style={{ fontSize: "1rem", color: "#aaaaaa" }}>달력</div>
          <WhiteBox>
            <CalendarMain
              todaySchedule={teamMain.schedule.today}
              monthSchedule={teamMain.schedule.month}
            />
          </WhiteBox>
        </CalendarContainer>
      </LeftContainer>
      <RightContainer>
        <div style={{ fontSize: "1rem", color: "#aaaaaa" }}>팀원 프로필</div>
        <WhiteBox>
          <MemberProfile members={teamMain.members} />
        </WhiteBox>
      </RightContainer>
    </Container>
  );
};

export default TeamMain;
