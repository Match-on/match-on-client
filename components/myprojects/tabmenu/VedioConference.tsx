import React from "react";
import styled from "@emotion/styled";
//1367 645
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
`;

const ButtonSet = styled.div`
  width: 35%;
  height: 14%;
  display: flex;
  justify-content: space-between;
`;

const StartButton = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 1.25rem;
  text-align: center;
  font-weight: 400;
  font-size: 1rem;
  border: 2px solid black;
`;

const SettingButton = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 1.25rem;
  text-align: center;
  font-weight: 400;
  font-size: 1rem;
  border: 2px solid black;
`;

const VedioSchedule = styled.div`
  width: 30%;
  height: 70%;
  border: 2px solid black;
`;

const VedioConference = () => {
  return (
    <Container>
      <ButtonSet>
        <StartButton>생성 / 참여</StartButton>
        <SettingButton>회의 설정</SettingButton>
      </ButtonSet>
      <VedioSchedule></VedioSchedule>
    </Container>
  );
};

export default VedioConference;
