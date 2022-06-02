import React from "react";
import styled from "@emotion/styled";

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
  width: 67%;
  height: 100%;
`;

const RightContainer = styled.div`
  width: 33%;
  margin-left: 2%;
  height: 100%;
`;

const AlarmDday = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 32%;
`;

const RecentAlarm = styled.div`
  width: 80%;
  height: 100%;
`;

const Dday = styled.div`
  width: 17%;
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
`;

const Tabmain = () => {
  return (
    <Container>
      <LeftContainer>
        <AlarmDday>
          <RecentAlarm>
            <div style={{ fontSize: "1rem", color: "#aaaaaa" }}>최근 알람</div>
            <WhiteBox></WhiteBox>
          </RecentAlarm>
          <Dday>
            <div style={{ fontSize: "1rem", color: "#aaaaaa" }}>D-day</div>
            <WhiteBox></WhiteBox>
          </Dday>
        </AlarmDday>
        <CalendarContainer>
          <div style={{ fontSize: "1rem", color: "#aaaaaa" }}>달력</div>
          <WhiteBox></WhiteBox>
        </CalendarContainer>
      </LeftContainer>
      <RightContainer>
        <div style={{ fontSize: "1rem", color: "#aaaaaa" }}>팀원 프로필</div>
        <WhiteBox></WhiteBox>
      </RightContainer>
    </Container>
  );
};

export default Tabmain;
