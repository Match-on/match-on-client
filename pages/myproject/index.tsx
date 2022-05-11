import styled from "@emotion/styled";
import { NextPage } from "next";
import React from "react";
import ProjectBox from "../../components/myproject/projectBox";

const MyprojectPage = styled.div`
  margin: 0 50px 0 50px;
`;

const MyprojectTitle = styled.div`
  width: 153px;
  font-size: 24px;
  font-weight: 400;
  border-left: 4px solid #50d5d5;
  text-align: center;
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin: 40px 0 17px 0;
  color: #aaaaaa;
`;

const BookmarksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
`;

const ProjectContainer = styled.div``;

const data = [
  { title: "밥조", subject: "정보서비스디자인01", describe: "세상의 모든 이동 mobility", deadline: "2022-12-31" },
  { title: "밥조", subject: "정보서비스디자인01", describe: "세상의 모든 이동 mobility", deadline: "2022-12-31" },
  { title: "밥조", subject: "정보서비스디자인01", describe: "세상의 모든 이동 mobility", deadline: "2022-12-31" },
  { title: "밥조", subject: "정보서비스디자인01", describe: "세상의 모든 이동 mobility", deadline: "2022-12-31" },
  { title: "밥조", subject: "정보서비스디자인01", describe: "세상의 모든 이동 mobility", deadline: "2022-12-31" },
  { title: "밥조", subject: "정보서비스디자인01", describe: "세상의 모든 이동 mobility", deadline: "2022-12-31" },
  { title: "밥조", subject: "정보서비스디자인01", describe: "세상의 모든 이동 mobility", deadline: "2022-12-31" },
  { title: "밥조", subject: "정보서비스디자인01", describe: "세상의 모든 이동 mobility", deadline: "2022-12-31" },
  { title: "밥조", subject: "정보서비스디자인01", describe: "세상의 모든 이동 mobility", deadline: "2022-12-31" },
  { title: "밥조", subject: "정보서비스디자인01", describe: "세상의 모든 이동 mobility", deadline: "2022-12-31" },
];

const myproject: NextPage = () => {
  return (
    <MyprojectPage>
      <MyprojectTitle>내 프로젝트</MyprojectTitle>
      <SubTitle>즐겨찾기</SubTitle>
      <BookmarksContainer>
        {data.map((v, i) => (
          <ProjectBox title={v.title} subject={v.subject} describe={v.describe} deadline={v.deadline} />
        ))}
      </BookmarksContainer>
      <SubTitle>내 프로젝트</SubTitle>
      <BookmarksContainer>
        {data.map((v, i) => (
          <ProjectBox title={v.title} subject={v.subject} describe={v.describe} deadline={v.deadline} />
        ))}
      </BookmarksContainer>
    </MyprojectPage>
  );
};

export default myproject;
