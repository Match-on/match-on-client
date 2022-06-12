import styled from "@emotion/styled";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ClassBox } from "../../components/myprojects/components/ProjectClassBox";
import LeftArrow from "../../public/componentSVG/Arrow/Left_Arrow.svg";
import RightArrow from "../../public/componentSVG/Arrow/Right_Arrow.svg";

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
  width: 100%;
  align-content: space-between;
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
    id: "1234567",
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
  const TOTAL_SLIDES = data.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const NextSlide = () => {
    if (currentIndex + 1 < TOTAL_SLIDES) {
      setCurrentIndex(currentIndex + 1);
    }
    if (currentSlide + 4 >= TOTAL_SLIDES) {
      return;
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const PrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      if (currentSlide === 0) {
        setCurrentIndex(currentIndex - 1);
        return;
      } else {
        setCurrentSlide(currentSlide - 1);
      }
    }
  };
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    slideRef.current.style.width = `20vw`;
  }, [currentSlide]);

  return (
    <ClassPage>
      <ClassTitle>중앙대학교</ClassTitle>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SubTitle>즐겨찾기</SubTitle>
        <div style={{ display: "flex", margin: "2.5em 0 0 0" }}>
          <ArrowIcon isRemain={currentIndex !== 0}>
            <LeftArrow onClick={PrevSlide} />
          </ArrowIcon>
          <ArrowIcon isRemain={currentIndex !== TOTAL_SLIDES - 1}>
            <RightArrow onClick={NextSlide} />
          </ArrowIcon>
        </div>
      </div>
      <BookmarksContainer ref={slideRef}>
        {data.map((v, i) => (
          <Link href={`/classboard/${v.id}`} key={`favoriteClass-${i}`}>
            <a>
              <ClassBox
                className={v.class}
                classfication={v.classification}
                professor={v.professor}
                grade={v.grade}
                time={v.time}
                selected={i === currentIndex}
              />
            </a>
          </Link>
        ))}
      </BookmarksContainer>
    </ClassPage>
  );
};

export default ClassBoard;
