import styled from "@emotion/styled";
import React from "react";

const BoxContainer = styled.div`
  width: 15.875em;
  height: 18.75em;
  display: flex;
  margin-bottom: 1.25em;
  cursor: pointer;
`;

const BoxContent = styled.div`
  width: 13.75em;
  height: 18.75em;
  margin: auto;
  background-color: white;
  border-radius: 1.25em;
  padding: 1em;
`;

const Title = styled.div`
  font-size: 1em;
  font-weight: 400;
`;

const Subject = styled.div`
  font-size: 0.875em;
  font-weight: 400;
  color: lightgray;
`;

const Describe = styled.div`
  width: 100%;
  height: 38%;
  font-size: 0.75rem;
  font-weight: 400;
  background: #eaeaea;
  border-radius: 0.625em;
`;

const Board = styled.div`
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const ProjectBox = ({ title, subject, describe, deadline }) => {
  return (
    <BoxContainer>
      <BoxContent>
        <Title>{title}</Title>
        <Subject>{subject}</Subject>
        <Describe>{describe}</Describe>
      </BoxContent>
    </BoxContainer>
  );
};
// id: "1234567",
//     class: "정보서비스디자인",
//     classification: "전공 선택",
//     professor: "신동천",
//     grade: 3,
//     time: "월요일 3 4",
export const ClassBox = ({ className, classfication, professor, grade, time }) => {
  return (
    <BoxContainer>
      <BoxContent>
        <Title>{className}</Title>
        <Subject>{classfication}</Subject>
        <Describe style={{ height: "30%" }}>
          <div>교수님 {professor}</div>
          <div>학점 {grade}</div>
          <div>시간 {time}</div>
        </Describe>
        <Board>
          <div style={{ fontSize: "0.625rem" }}>게시판</div>
          <div>자유게시판</div>
          <div>정보공유게시판</div>
          <div>팀원모집게시판</div>
        </Board>
      </BoxContent>
    </BoxContainer>
  );
};
