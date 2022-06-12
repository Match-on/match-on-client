import styled from "@emotion/styled";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { ProjectBox } from "../../components/myprojects/components/ProjectClassBox";

const MyprojectPage = styled.div`
  width: calc(100% - 8%);
  margin-left: 4%;
  height: 100%;
`;

const MyprojectTitle = styled.div`
  width: 9.6em;
  font-size: 1.5rem;
  font-weight: 400;
  border-left: 0.25rem solid #50d5d5;
  text-align: center;
`;

const SubTitle = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin: 2.5em 0 1em 0;
  color: #aaaaaa;
`;

const BookmarksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
`;

const ProjectContainer = styled.div``;

const data = [
  {
    title: "Match-On",
    subject: "정보서비스디자인01",
    describe: "세상의 모든 이동 mobility",
    deadline: "2022-12-31",
    id: "123456",
  },
  {
    title: "밥조",
    subject: "정보서비스디자인01",
    describe: "세상의 모든 이동 mobility",
    deadline: "2022-12-31",
    id: "1234567",
  },
  {
    title: "밥조",
    subject: "정보서비스디자인01",
    describe: "세상의 모든 이동 mobility",
    deadline: "2022-12-31",
    id: "2123456",
  },
  {
    title: "밥조",
    subject: "정보서비스디자인01",
    describe: "세상의 모든 이동 mobility",
    deadline: "2022-12-31",
    id: "3123456",
  },
  {
    title: "밥조",
    subject: "정보서비스디자인01",
    describe: "세상의 모든 이동 mobility",
    deadline: "2022-12-31",
    id: "4123456",
  },
  {
    title: "밥조",
    subject: "정보서비스디자인01",
    describe: "세상의 모든 이동 mobility",
    deadline: "2022-12-31",
    id: "5123456",
  },
  {
    title: "밥조",
    subject: "정보서비스디자인01",
    describe: "세상의 모든 이동 mobility",
    deadline: "2022-12-31",
    id: "6123456",
  },
  {
    title: "밥조",
    subject: "정보서비스디자인01",
    describe: "세상의 모든 이동 mobility",
    deadline: "2022-12-31",
    id: "7123456",
  },
  {
    title: "밥조",
    subject: "정보서비스디자인01",
    describe: "세상의 모든 이동 mobility",
    deadline: "2022-12-31",
    id: "8123456",
  },
  {
    title: "밥조",
    subject: "정보서비스디자인01",
    describe: "세상의 모든 이동 mobility",
    deadline: "2022-12-31",
    id: "9123456",
  },
];

const myproject: NextPage = () => {
  return (
    <MyprojectPage>
      <MyprojectTitle>내 프로젝트</MyprojectTitle>
      <SubTitle>즐겨찾기</SubTitle>
      <BookmarksContainer>
        {data.map((v, i) => (
          <Link href={`/myproject/${v.id}`} key={`favorite-${i}`}>
            <a>
              <ProjectBox title={v.title} subject={v.subject} describe={v.describe} deadline={v.deadline} />
            </a>
          </Link>
        ))}
      </BookmarksContainer>
      <SubTitle>내 프로젝트</SubTitle>
      <BookmarksContainer>
        {data.map((v, i) => (
          <Link href={`/myproject/${v.id}`} key={`project-${i}`}>
            <a>
              <ProjectBox title={v.title} subject={v.subject} describe={v.describe} deadline={v.deadline} />
            </a>
          </Link>
        ))}
      </BookmarksContainer>
    </MyprojectPage>
  );
};

export default myproject;
