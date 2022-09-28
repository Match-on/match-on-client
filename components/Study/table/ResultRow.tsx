import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "../../../src/hooks/useIntersectionObserver";
import { API_URL } from "../../api/API";

import Seen from "../../../public/componentSVG/table/seen.svg";
import Comment from "../../../public/componentSVG/table/comment.svg";

const Row = styled.div`
  font-family: "Noto Sans";
  width: 100%;
  min-height: 3.875rem;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1%;
  &:hover {
    border-left: 3px solid #47d2d2;
    cursor: pointer;
  }
`;

const Column = styled.div<{ width: number }>`
  height: 100%;
  width: ${(props) => props.width + "%"};
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
`;

const TitleBody = styled(Column)`
  flex-direction: column;
  align-items: flex-start;
  .title {
    color: #000000;
    font-size: 0.875rem;
    font-weight: 400;
  }
  .body {
    color: #aaaaaa;
    font-size: 0.75rem;
  }
`;
const Prefix = styled.span`
  display: flex;
  padding-right: 0.5rem;
  font-size: 0.84rem;
  color: #a6a6a6;
  font-weight: 400;
`;

const ResultRow = (props) => {
  const { data: session, status } = useSession();
  const [favorite, setFavorite] = useState(props.favorite);
  const ref = useRef<HTMLDivElement | null>(null); // 감시할 엘리먼트
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    props.isLastItem && isIntersecting && props.getSearchResult(); // 목록의 마지막에 도달했을 때, 리스트를 더 불러오도록 요청한다.
  }, [props.isLastItem, isIntersecting]);
  useEffect(() => {
    props.setCursor();
  }, []);

  return (
    //2퍼 남
    <Row ref={ref}>
      <TitleBody width={50} style={{ fontSize: "1rem" }}>
        <div className="title">{props.title}</div>
        <div
          className="body"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
      </TitleBody>
      <Column width={10}>
        <Prefix>지역</Prefix>
        {props.region}
      </Column>
      <Column width={15}>
        <Prefix>분야</Prefix>
        {props.category}
      </Column>
      <Column width={10}>
        <Prefix>인원</Prefix>
        {props.count}명
      </Column>
      <Column width={10}>
        <Prefix>
          <Seen style={{ marginRight: "5px" }} />
          {props.hitCount}
        </Prefix>
        <Prefix>
          <Comment style={{ marginRight: "5px" }} />
          {props.commentCount}
        </Prefix>
      </Column>
    </Row>
  );
};

export default ResultRow;
