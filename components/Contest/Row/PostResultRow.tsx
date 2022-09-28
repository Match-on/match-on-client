import styled from "@emotion/styled";
import { parseISO, format } from "date-fns";
import Seen from "../../../public/componentSVG/table/seen.svg";
import Comment from "../../../public/componentSVG/table/comment.svg";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import useIntersectionObserver from "../../../src/hooks/useIntersectionObserver";
import axios from "axios";
import { API_URL } from "../../api/API";
import { useSession } from "next-auth/react";

const Table = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const Row = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1% 2%;
  cursor: pointer;
  &:hover {
    border-left: 4px solid #47d2d2;
    background: rgba(242, 246, 246, 0.5);
  }
`;

const Column = styled.div<{ width: number }>`
  height: 100%;
  width: ${(props) => props.width + "%"};
  font-size: 0.75rem;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
  .profileImg {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: red;
    margin-right: 0.25rem;
  }
  .user_info {
    display: flex;
    /* width: 3rem;
    justify-content: space-between; */
    align-items: center;
  }
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .body {
    margin-top: 0.25rem;
    height: calc(100% - 1.5rem);
    font-size: 0.75rem;
    color: #aaaaaa;
  }
  > div {
    display: flex;
  }
`;

const ResColumn = styled(Column)`
  font-size: 0.875rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #a6a6a6;
  @media screen and (max-width: 700px) {
    display: none;
  }
  .icon_wrapper {
    display: flex;
    justify-content: space-evenly;
    width: 30%;
    min-width: 2rem;
    max-width: 3rem;
  }
`;

const PostResultRow = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const ref = useRef<HTMLDivElement | null>(null); // 감시할 엘리먼트
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;

  const getPostList = async (params) => {
    try {
      const response = await axios.get(
        API_URL + `lectures/${props.lectureIdx}/posts`,
        {
          params: params,
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      const list = response.data.result;
      // props.setPostList((prev) => [...prev, ...list]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    props.isLastItem && isIntersecting && getPostList(props.params); // 목록의 마지막에 도달했을 때, 리스트를 더 불러오도록 요청한다.
  }, [props.isLastItem, isIntersecting]);
  useEffect(() => {
    props.setParams();
  }, []);

  return (
    <Row ref={ref}>
      <Column width={66}>
        <div>
          <div className="user_info">{props.writer}</div>
          <div className="title">{props.title}</div>
        </div>
        <span
          className="body"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {/* <div className="body">{stateFromHTML(post.body)}</div> */}
      </Column>
      <ResColumn className="responsive" width={17}>
        {format(parseISO(props.createdAt), "yyyy-MM-dd")}
      </ResColumn>
      <ResColumn className="responsive" width={17}>
        <div className="icon_wrapper">
          <Seen />
          {props.hitCount}
        </div>
        <div className="icon_wrapper">
          <Comment />
          {props.commentCount}
        </div>
      </ResColumn>
    </Row>
  );
};

export default PostResultRow;
// body: "<p></p>\n"
// commentCount: "0"
// createdAt: "2022-08-01T14:37:31.894Z"
// cursor: "165936465200000001"
// hitCount: "0"
// lecturePostIdx: 1
// profileUrl: null
// title: "d"
// writer: "익명"
