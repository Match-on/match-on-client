import styled from "@emotion/styled";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { StudyBox } from "../../components/myprojects/components/BoxContainer";
import Carousel, { SlideButton } from "../../components/sub/Carousel";

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
  padding-left: 5px;
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

const Study: NextPage = () => {
  const [slideRef, setSlideRef] = useState(null);
  const [select, setSelect] = useState<number>(0);
  return (
    <StudyPage>
      <StudyTitle>스터디</StudyTitle>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "1rem 0 0 0" }}>
        <SubTitle>즐겨찾기</SubTitle>
        <SlideButton slideRef={slideRef} select={select} setSelect={setSelect} length={data.length} />
      </div>
      <Carousel setSlideRef={setSlideRef}>
        {data.map((v, i) => (
          <Link href={`/study/${v.id}`} key={`scrapStudy-${i}`}>
            <a>
              <StudyBox selected={i === select} />
            </a>
          </Link>
        ))}
      </Carousel>
    </StudyPage>
  );
};

export default Study;
