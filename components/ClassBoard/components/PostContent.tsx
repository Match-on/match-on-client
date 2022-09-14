import styled from "@emotion/styled";
import axios from "axios";
import { parseISO } from "date-fns";
import format from "date-fns/format";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL } from "../../api/API";

import Seen from "../../../public/componentSVG/table/seen.svg";
import Comment from "../../../public/componentSVG/table/comment.svg";
import ShowComment from "../../sub/ShowComment";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../src/hooks/hooks";
import { RootState } from "../../../src/redux/store";
import { unCommentAction } from "../../../src/redux/reducers/comment";
import PostMenu from "../../sub/PostMenu";
import ResumeModal from "../../sub/ResumeModal";
import ResumeList from "../../sub/ResumeList";

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
interface ResumeUser {
  userIdx: number;
  nickname: string;
  profileUrl: string | null;
}
interface Resume {
  body: string;
  user: ResumeUser;
}

interface Detail {
  body: string;
  commentCount: string;
  comments: Comment[];
  createdAt?: string | Date;
  hitCount: string;
  isMe: string;
  lecturePostIdx: number | null;
  profileUrl: string | null;
  title: string;
  writer: string;
  resumes: Resume[] | null;
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const PostContainer = styled.div<{ type: string | string[]; isMe: string }>`
  width: ${(props) => (props.type === "team" && props.isMe === "1" ? "65%" : "100%")};
  height: 100%;
  display: flex;
  /* border: ${(props) => (props.type === "team" && props.isMe === "1" ? "1px solid black" : "")}; */
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 3% 3% 0 3%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 5rem);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  .icon {
    display: flex;
    width: 15%;
    max-width: 7rem;
  }
  .icon_wrapper {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin: 0.5rem 0;
  }
  .lower {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
`;

const Detail = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
  }
`;

const ProfileImg = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #47d2d2;
  margin-right: 1rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  .nickname {
    font-size: 1rem;
    color: #000000;
  }
  .created {
    font-size: 0.75rem;
    color: #a6a6a6;
  }
`;

const HtmlBody = styled.div`
  width: 100%;
  > p {
    height: 1.5rem;
  }
`;

const Comments = styled.div`
  width: 100%;
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
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #ffffff;
  border-top: 1px solid #dcdcdc;
  padding: 0.8rem 0;
`;

const InputComment = styled.input`
  width: 80%;
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

const MentionBox = styled.div`
  border: 1px solid black;
`;

const PostContent = ({ postIdx }) => {
  const router = useRouter();
  const { lectureIdx, type, tabnum } = router.query;
  const { data: session, status } = useSession();
  const [lectureName, setLectureName] = useState<string>("");
  const [detail, setDetail] = useState<Detail>({
    body: "",
    commentCount: "",
    comments: [],
    createdAt: new Date(),
    hitCount: "",
    isMe: "",
    lecturePostIdx: null,
    profileUrl: null,
    title: "",
    writer: "",
    resumes: null,
  });
  const [reply, setReply] = useState<string>("");
  const [parentIdx, setParentIdx] = useState<number>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  const commentState = useAppSelector((state: RootState) => state.comment.value);
  const dispatch = useAppDispatch();
  const getLectureName = async () => {
    try {
      const res = await axios.get(API_URL + `lectures/${lectureIdx}/name`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      setLectureName(res.data.result.name + " " + res.data.result.classNumber);
    } catch (err) {
      console.log(err);
    }
  };
  const getPostContent = async () => {
    try {
      const response = await axios.get(API_URL + `lectures/posts/${postIdx}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      if (response.data.code === 1000) {
        setDetail(response.data.result);
        dispatch(unCommentAction());
        console.log(response.data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const postComment = async () => {
    try {
      const response = await axios.post(
        API_URL + `lectures/posts/${postIdx}/comments`,
        { type: type, comment: reply, parentIdx: parentIdx },
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
      console.log(err);
    }
  };
  const patchComment = async () => {
    try {
      const res = await axios.patch(
        API_URL + `lectures/posts/comments/${commentState.idx}`,
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

  const handleResume = () => {
    setIsResumeModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (session?.user) {
      getLectureName();
      getPostContent();
    }
    console.log(lectureName);
  }, [session]);

  return (
    <Container>
      <PostContainer type={type} isMe={detail.isMe}>
        <Content>
          <Detail>
            <div className="left">
              <ProfileImg></ProfileImg>
              <Info>
                <div className="nickname">{detail.writer}</div>
                <div className="created">
                  {typeof detail.createdAt === "string" && format(parseISO(detail.createdAt), "yyyy-MM-dd")}
                </div>
              </Info>
            </div>
            {detail.isMe === "1" && <PostMenu postIdx={postIdx} lectureIdx={lectureIdx} tabnum={tabnum} />}
          </Detail>
          <HtmlBody dangerouslySetInnerHTML={{ __html: detail.body }} />
          <div className="lower">
            <div className="icon">
              <div className="icon_wrapper">
                <Seen />
                {detail.hitCount}
              </div>
              <div className="icon_wrapper">
                <Comment />
                {detail.commentCount}
              </div>
            </div>
            <Link href={`/classboard/${lectureIdx}?tabnum=${tabnum}`}>
              <BackToList>목록으로 돌아가기</BackToList>
            </Link>
          </div>
          <Comments>
            <ShowComment commentList={detail.comments} setParentIdx={setParentIdx} getPost={getPostContent} />
          </Comments>
        </Content>
        <WriteComment>
          <div>
            {commentState.idx}에게{commentState.state}
          </div>
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
            onClick={reply.length !== 0 ? (commentState.state !== "patch" ? postComment : patchComment) : undefined}
          >
            {commentState.state === null ? (
              <p>댓글쓰기</p>
            ) : commentState.state === "reply" ? (
              <p>답글달기</p>
            ) : (
              <p>수정하기</p>
            )}
          </WriteButton>
          {type === "team" && detail.isMe === "0" && <WriteButton onClick={handleResume}>지원서 작성</WriteButton>}
        </WriteComment>
      </PostContainer>
      {type === "team" && detail.isMe === "1" && (
        <ResumeList resumeList={detail.resumes} type={lectureName} index={Number(lectureIdx)} />
      )}
      {isResumeModalOpen && (
        <ResumeModal isOpen={isResumeModalOpen} handleOpen={handleResume} postIdx={postIdx} type={"lecture"} />
      )}
    </Container>
  );
};

export default PostContent;
