import styled from "@emotion/styled";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ClassBox } from "../../components/myprojects/components/ProjectClassBox";
import LeftArrow from "../../public/componentSVG/Arrow/Left_Arrow.svg";
import RightArrow from "../../public/componentSVG/Arrow/Right_Arrow.svg";

const ContestPage = styled.div`
  width: calc(100% - 8%);
  margin-left: 4%;
  height: 100%;
`;

const ContestTitle = styled.div`
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
const ContestContainer = styled.div`
  display: flex;
  width: 16.5rem;
  cursor: pointer;
  margin-right: calc(20vw - 16.5rem);
`;

const ContestContent = styled.div<{ selected: boolean }>`
  width: 93%;
  height: 18.75em;
  background-color: white;
  border-radius: 1.25em;
  padding: 1em;
  box-shadow: ${(props) => (props.selected ? "0px 0px 10px rgba(0, 0, 0, 0.3)" : "")};
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
    category: "디자인",
    title: "잡코리아 디자인 공모전",
    deadline: "2022-07-02",
    seen: 15,
    comments: 3,
    imgsrc: "/contestSrc.jpeg",
  },
  {
    id: "1234567",
    category: "디자인",
    title: "잡코리아 디자인 공모전",
    deadline: "2022-07-02",
    seen: 15,
    comments: 3,
    imgsrc: "/contestSrc.jpeg",
  },
  {
    id: "1234567",
    category: "디자인",
    title: "잡코리아 디자인 공모전",
    deadline: "2022-07-02",
    seen: 15,
    comments: 3,
    imgsrc: "/contestSrc.jpeg",
  },
  {
    id: "1234567",
    category: "디자인",
    title: "잡코리아 디자인 공모전",
    deadline: "2022-07-02",
    seen: 15,
    comments: 3,
    imgsrc: "/contestSrc.jpeg",
  },
  {
    id: "1234567",
    category: "디자인",
    title: "잡코리아 디자인 공모전",
    deadline: "2022-07-02",
    seen: 15,
    comments: 3,
    imgsrc: "/contestSrc.jpeg",
  },
  {
    id: "1234567",
    category: "디자인",
    title: "잡코리아 디자인 공모전",
    deadline: "2022-07-02",
    seen: 15,
    comments: 3,
    imgsrc: "/contestSrc.jpeg",
  },
  {
    id: "1234567",
    category: "디자인",
    title: "잡코리아 디자인 공모전",
    deadline: "2022-07-02",
    seen: 15,
    comments: 3,
    imgsrc: "/contestSrc.jpeg",
  },
  {
    id: "1234567",
    category: "디자인",
    title: "잡코리아 디자인 공모전",
    deadline: "2022-07-02",
    seen: 15,
    comments: 3,
    imgsrc: "/contestSrc.jpeg",
  },
  {
    id: "1234567",
    category: "디자인",
    title: "잡코리아 디자인 공모전",
    deadline: "2022-07-02",
    seen: 15,
    comments: 3,
    imgsrc: "/contestSrc.jpeg",
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
    <ContestPage>
      <ContestTitle>공모전</ContestTitle>
      <SubTitle>스크랩</SubTitle>{" "}
      <div style={{ display: "flex", margin: "2.5em 0 0 0" }}>
        <ArrowIcon isRemain={currentIndex !== 0}>
          <LeftArrow onClick={PrevSlide} />
        </ArrowIcon>
        <ArrowIcon isRemain={currentIndex !== TOTAL_SLIDES - 1}>
          <RightArrow onClick={NextSlide} />
        </ArrowIcon>
      </div>
      <BookmarksContainer ref={slideRef}>
        {data.map((v, i) => (
          <Link href={`/contest/${v.id}`} key={`favoriteContest-${i}`}>
            <a>
              <ContestContainer>
                <ContestContent selected={currentIndex === i}>
                  <Image src={v.imgsrc} width={500} height={500} />
                  <div style={{ display: "flex", flexDirection: "column", fontSize: "0.75rem" }}>
                    <p>{v.category}</p>
                    <p>{v.title}</p>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                      <p>{v.deadline}</p>
                      <p>{v.seen}</p>
                      <p>{v.comments}</p>
                    </div>
                  </div>
                </ContestContent>
              </ContestContainer>
            </a>
          </Link>
        ))}
      </BookmarksContainer>
    </ContestPage>
  );
};

export default ClassBoard;
