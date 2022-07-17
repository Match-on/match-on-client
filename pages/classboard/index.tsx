import styled from "@emotion/styled";
import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { ClassBox } from "../../components/myprojects/components/BoxContainer";
import Carousel, { SlideButton } from "../../components/sub/Carousel";

const ClassPage = styled.div`
  width: calc(100% - 8%);
  margin-left: 4%;
  height: 100%;
`;

const ClassTitle = styled.div`
  width: 9.6em;
  font-size: 1.5rem;
  font-weight: 400;
  border-left: 0.25rem solid #50d5d5;
  padding-left: 5px;
`;

const SubTitle = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #aaaaaa;
`;

const ArrowIcon = styled.div<{ isRemain: boolean }>`
  padding: 0 1rem 0 0;
  cursor: ${(props) => (props.isRemain ? "pointer" : "default")};
  svg {
    &:hover {
      stroke: ${(props) => (props.isRemain ? "#46d2d3" : "#aaaaaa")};
    }
    stroke: ${(props) => (props.isRemain ? "#46d2d3" : "#aaaaaa")};
  }
`;

const data = [
  {
    id: "1234567",
    class: "정보서비스디자인1",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
  {
    id: "12345678",
    class: "정보서비스디자인2",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
  {
    id: "1234567",
    class: "정보서비스디자인3",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
  {
    id: "1234567",
    class: "정보서비스디자인4",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
  {
    id: "1234567",
    class: "정보서비스디자인5",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
  {
    id: "1234567",
    class: "정보서비스디자인6",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
  {
    id: "1234567",
    class: "정보서비스디자인7",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
  {
    id: "1234567",
    class: "정보서비스디자인8",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
];

const ClassBoard: NextPage = () => {
  const [slideRef, setSlideRef] = useState(null);
  const [select, setSelect] = useState(0);
  console.log(data.length);

  return (
    <ClassPage>
      <ClassTitle>중앙대학교</ClassTitle>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem 0 0 0" }}>
        <SubTitle>즐겨찾기</SubTitle>
        <SlideButton slideRef={slideRef} select={select} setSelect={setSelect} length={data.length} />
      </div>
      <Carousel setSlideRef={setSlideRef}>
        {data.map((v, i) => (
          <Link href={`/classboard/${v.id}`} key={`favoriteClass-${i}`}>
            <a>
              <ClassBox
                className={v.class}
                classfication={v.classification}
                professor={v.professor}
                grade={v.grade}
                time={v.time}
                selected={select === i}
              />
            </a>
          </Link>
        ))}
      </Carousel>
    </ClassPage>
  );
};

export default ClassBoard;
