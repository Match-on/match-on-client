import styled from "@emotion/styled";
import { parseISO, format } from "date-fns";
import Seen from "../../../public/componentSVG/table/seen.svg";
import Comment from "../../../public/componentSVG/table/comment.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
    margin-left: 1rem;
    display: flex;
    align-items: center;
  }
  .body {
    margin-top: 0.25rem;
    height: calc(100% - 1.5rem);
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
    width: 20%;
    min-width: 2rem;
  }
`;

const ClassTable = ({ data, lectureIdx, typeIdx }) => {
  const router = useRouter();
  console.log("data", data);

  return (
    <Table>
      {data.map((post, idx) => (
        <Row
          key={idx}
          onClick={() => router.push(`/classboard/${lectureIdx}/${post.lecturePostIdx}?tabnum=${typeIdx}`)}
        >
          <Column width={66}>
            <div>
              <div className="user_info">
                <div className="profileImg" />
                {post.writer}
              </div>
              <div className="title">{post.title}</div>
            </div>
            <span className="body" dangerouslySetInnerHTML={{ __html: post.body }} />
            {/* <div className="body">{stateFromHTML(post.body)}</div> */}
          </Column>
          <ResColumn className="responsive" width={17}>
            {format(parseISO(post.createdAt), "yyyy-MM-dd")}
          </ResColumn>
          <ResColumn className="responsive" width={17}>
            <div className="icon_wrapper">
              <Seen />
              {post.hitCount}
            </div>
            <div className="icon_wrapper">
              <Comment />
              {post.commentCount}
            </div>
          </ResColumn>
        </Row>
      ))}
    </Table>
  );
};

export default ClassTable;
// body: "<p></p>\n"
// commentCount: "0"
// createdAt: "2022-08-01T14:37:31.894Z"
// cursor: "165936465200000001"
// hitCount: "0"
// lecturePostIdx: 1
// profileUrl: null
// title: "d"
// writer: "익명"
