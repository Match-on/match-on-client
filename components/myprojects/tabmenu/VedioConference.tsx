import React from "react";
import styled from "@emotion/styled";
//1367 645
const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
`;

const ButtonSet = styled.div`
  width: 480px;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;

const StartButton = styled.div`
  width: 210px;
  height: 90px;
  border-radius: 20px;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 90px;
  border: 2px solid black;
`;

const SettingButton = styled.div`
  width: 210px;
  height: 90px;
  border-radius: 20px;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 90px;
  border: 2px solid black;
`;

const VedioSchedule = styled.div`
  width: 400px;
  height: 450px;
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
