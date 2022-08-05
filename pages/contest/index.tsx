import styled from "@emotion/styled";
import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { ContestBox } from "../../components/myprojects/components/BoxContainer";
import Carousel, { SlideButton } from "../../components/sub/Carousel";

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
  padding-left: 5px;
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

const Contest: NextPage = () => {
  const [slideRef, setSlideRef] = useState(null);
  const [select, setSelect] = useState<number>(0);
  return (
    <ContestPage>
      <ContestTitle>공모전</ContestTitle>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "1rem 0 0 0" }}>
        <SubTitle>즐겨찾기</SubTitle>
        <SlideButton slideRef={slideRef} select={select} setSelect={setSelect} length={data.length} />
      </div>
      <Carousel setSlideRef={setSlideRef}>
        {data.map((v, i) => (
          <Link href={`/contest/${v.id}`} key={`favoriteContest-${i}`}>
            <a>
              <ContestBox
                title={v.title}
                category={v.category}
                deadline={v.deadline}
                seen={v.seen}
                comments={v.comments}
                imgsrc={v.imgsrc}
                selected={i === select}
              />
            </a>
          </Link>
        ))}
      </Carousel>
    </ContestPage>
  );
};

export default Contest;
