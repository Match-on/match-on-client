import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import Menu from "../../public/componentSVG/Menu.svg";
import { useAppDispatch } from "../../src/hooks/hooks";
import { commentAction } from "../../src/redux/reducers/comment";
import { API_URL } from "../api/API";
import CommentMenu from "./CommentMenu";

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: #f2f6f6;
  font-size: 0.875rem;
  border-radius: 10px;
`;
const ChildContent = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: #f2f6f6;
  font-size: 0.875rem;
  border-radius: 10px;
`;

const LeftSide = styled.div`
  width: 92%;
`;
const RightSide = styled.div`
  width: 6%;
  min-width: 3rem;
  min-height: 4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 50px;
`;

const Profile = styled.div`
  height: 1.25rem;
  display: flex;
  align-items: center;
  .img {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background-color: #aaaaaa;
    margin-right: 0.3rem;
  }
  .nickname {
    font-size: 0.75rem;
    color: #000000;
    .writer {
      color: #47d2d2;
    }
  }
`;
const Comment = styled.div`
  width: 100%;
  min-width: 500px;
  font-size: 0.875rem;
`;
const AppendChild = styled.div`
  font-size: 0.625rem;
  color: #ababab;
  cursor: pointer;
`;

export const ParentRow = (props) => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const onClickReply = (parentIdx) => {
    dispatch(commentAction({ state: "reply", idx: parentIdx }));
    props.setParentIdx(parentIdx);
    document.getElementById("input_comment").focus();
  };

  return (
    <Content>
      <LeftSide>
        <Profile>
          <div className="img" />
          <div className="nickname">
            {props.isWriter === "1" ? <span className="writer">글쓴이</span> : <span>{props.name}</span>}
          </div>
        </Profile>
        <Comment>{props.comment}</Comment>
      </LeftSide>
      <RightSide>
        {props.isMe === "1" ? <CommentMenu commentIdx={props.commentIdx} getPost={props.getPost} /> : <div />}
        <AppendChild onClick={() => onClickReply(props.commentIdx)}>답글 달기</AppendChild>
      </RightSide>
    </Content>
  );
};

export const ChildRow = (props) => {
  return (
    <ChildContent>
      <LeftSide>
        <Profile>
          <div className="img" />
          <div className="nickname">
            {props.isWriter === "1" ? <span className="writer">글쓴이</span> : <span>{props.name}</span>}
          </div>
        </Profile>
        <Comment>{props.comment}</Comment>
      </LeftSide>
      <RightSide>
        {props.isMe === "1" ? <CommentMenu commentIdx={props.commentIdx} getPost={props.getPost} /> : <div />}
      </RightSide>
    </ChildContent>
  );
};
