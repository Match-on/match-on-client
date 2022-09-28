import React from "react";
import styled from "@emotion/styled";
import Camera from "/public/Camera.svg";
import Link from "next/link";
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
  width: 15rem;
  height: 10rem;
  border-radius: 1.25rem;
  font-weight: 400;
  font-size: 1.5rem;
  background-color: #47d2d2;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #ffffff;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  }
  border-radius: 20px;
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
      {/* <ButtonSet>
        <StartButton>생성 / 참여</StartButton>
        <SettingButton>회의 설정</SettingButton>
      </ButtonSet>
      <VedioSchedule></VedioSchedule> */}
      <a href={"http://localhost:5000/"} target="_blank" rel="noreferrer">
        <StartButton>
          <Camera />
          생성 / 참여
        </StartButton>
      </a>
    </Container>
  );
};

export default VedioConference;
