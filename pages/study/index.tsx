import styled from "@emotion/styled";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { StudyBox } from "../../components/myprojects/components/ProjectClassBox";
import LeftArrow from "../../public/componentSVG/Arrow/Left_Arrow.svg";
import RightArrow from "../../public/componentSVG/Arrow/Right_Arrow.svg";

const StudyPage = styled.div`
  width: calc(100% - 8%);
  margin-left: 4%;
  height: 100%;
`;

const StudyTitle = styled.div`
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
  { id: 123324456 },
  { id: 123434534556 },
  { id: 1234234456 },
  { id: 1234345756 },
  { id: 12323423456 },
  { id: 123432256 },
  { id: 1232235678456 },
  { id: 123445345256 },
  { id: 12344534645656 },
  { id: 123432424323456 },
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
    <StudyPage>
      <StudyTitle>스터디</StudyTitle>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SubTitle>스크랩</SubTitle>
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
          <Link href={`/study/${v.id}`} key={`scrapStudy-${i}`}>
            <a>
              <StudyBox></StudyBox>
            </a>
          </Link>
        ))}
      </BookmarksContainer>
    </StudyPage>
  );
};

export default ClassBoard;
