import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../src/hooks/hooks";
import { unCommentAction } from "../../../src/redux/reducers/comment";
import { RootState } from "../../../src/redux/store";
import { API_URL } from "../../api/API";
import ShowComment from "../../sub/ShowComment";

interface ChildComment {
  comment: string;
  commentIdx: number;
  createdAt: string;
  isMe: string;
  isWriter: string;
  name: string;
  profileUrl: string | null;
}

interface Comment {
  childComments: ChildComment[];
  comment: string;
  commentIdx: number;
  createdAt: string;
  isMe: string;
  isWriter: string;
  name: string;
  profileUrl: string | null;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
`;
const Comments = styled.div`
  width: 100%;
  height: calc(100% - 5rem);
  padding-bottom: 2rem;
`;

const BackToList = styled.a`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: #47d2d2;
  text-decoration-line: underline;
  cursor: pointer;
`;

const WriteComment = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #ffffff;
  border-top: 1px solid #dcdcdc;
  padding: 0.8rem 0;
`;

const InputComment = styled.input`
  width: 100%;
  height: 2.5rem;
  border-radius: 0.625rem;
  padding-left: 1%;
  border: none;
  background: #f2f6f6;
  color: #ababab;
  &:focus {
    outline: 2px solid #47d2d2;
  }
  ::-webkit-input-placeholder {
    margin-left: 20px;
  }
`;

const WriteButton = styled.div`
  width: 10%;
  max-width: 7rem;
  min-width: 5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #989898;
  border: 2px solid #47d2d2;
  border-radius: 0.625rem;
  cursor: pointer;
  &:hover {
    border: 4px solid #47d2d2;
  }
`;

const ContestComments = () => {
  const router = useRouter();
  const { contestIdx } = router.query;
  const { data: session, status } = useSession();
  const [datail, setDetail] = useState<Comment[]>([]);
  const [reply, setReply] = useState<string>("");
  const [parentIdx, setParentIdx] = useState<number>(null);
  const commentState = useAppSelector(
    (state: RootState) => state.comment.value
  );
  const dispatch = useAppDispatch();
  //
  const getPostContent = async () => {
    try {
      const response = await axios.get(
        API_URL + `activities/${contestIdx}/comments`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      console.log(response.data.result);

      if (response.data.code === 1000) {
        setDetail(response.data.result);
        dispatch(unCommentAction());
      }
    } catch (err) {
      console.log(err);
    }
  };
  const postComment = async () => {
    try {
      const response = await axios.post(
        API_URL + `activities/${contestIdx}/comments`,
        { comment: reply, parentIdx: parentIdx },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (response.data.code === 1000) {
        setReply("");
        setParentIdx(null);
        getPostContent();
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  const patchComment = async () => {
    try {
      const res = await axios.patch(
        API_URL + `activities/comments/${commentState.idx}`,
        {
          comment: reply,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (res.data.code === 1000) {
        getPostContent();
        setReply("");
      } else {
        alert("수정에 실패하였습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (session?.user) getPostContent();
  }, [session]);
  return (
    <Container>
      <Comments>
        <ShowComment
          commentList={datail}
          setParentIdx={setParentIdx}
          getPost={getPostContent}
        />
      </Comments>
      <WriteComment>
        {/* <div>
          {commentState.idx}에게{commentState.state}
        </div> */}
        <InputComment
          type="text"
          id="input_comment"
          value={reply}
          placeholder="댓글을 작성하세요."
          onChange={(e) => setReply(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              if (commentState.state === "patch") {
                patchComment();
              } else {
                postComment();
              }
            }
          }}
        ></InputComment>
        <WriteButton
          id="button_comment"
          onClick={
            reply.length !== 0
              ? commentState.state !== "patch"
                ? postComment
                : patchComment
              : undefined
          }
        >
          {commentState.state === null ? (
            <p>댓글쓰기</p>
          ) : commentState.state === "reply" ? (
            <p>답글달기</p>
          ) : (
            <p>수정하기</p>
          )}
        </WriteButton>
      </WriteComment>
    </Container>
  );
};

export default ContestComments;
