import styled from "@emotion/styled";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ClassBox } from "../../components/myprojects/components/ProjectClassBox";

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
  align-content: space-between;
`;

const data = [
  {
    id: "1234567",
    class: "정보서비스디자인",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
  {
    id: "1234567",
    class: "정보서비스디자인",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
  {
    id: "1234567",
    class: "정보서비스디자인",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
  {
    id: "1234567",
    class: "정보서비스디자인",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
  {
    id: "1234567",
    class: "정보서비스디자인",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
  {
    id: "1234567",
    class: "정보서비스디자인",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
  {
    id: "1234567",
    class: "정보서비스디자인",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
  {
    id: "1234567",
    class: "정보서비스디자인",
    classification: "전공 선택",
    professor: "신동천",
    grade: 3,
    time: "월요일 3 4",
  },
];

const ClassBoard: NextPage = () => {
  const TOTAL_SLIDES = data.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      return;
    } else {
      console.log(TOTAL_SLIDES);

      setCurrentSlide(currentSlide + 1);
    }
  };
  const PrevSlide = () => {
    if (currentSlide === 0) {
      return;
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <ClassPage>
      <ClassTitle>중앙대학교</ClassTitle>
      <SubTitle>즐겨찾기</SubTitle>
      <div>{currentSlide + 1}컨테니어</div>
      <BookmarksContainer ref={slideRef}>
        {data.map((v, i) => (
          <Link href={`/classboard/${v.id}`} key={`favorite-${i}`}>
            <a>
              <ClassBox
                className={v.class}
                classfication={v.classification}
                professor={v.professor}
                grade={v.grade}
                time={v.time}
              />
            </a>
          </Link>
        ))}
      </BookmarksContainer>
      <button onClick={PrevSlide}>prev</button>
      <button onClick={NextSlide}>next</button>
    </ClassPage>
  );
};

export default ClassBoard;
