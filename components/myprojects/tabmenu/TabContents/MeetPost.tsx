import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../../src/hooks/hooks";
import MenuIcon from "../../../../public/componentSVG/Menu.svg";
import { unCommentAction } from "../../../../src/redux/reducers/comment";
import { RootState } from "../../../../src/redux/store";
import { API_URL } from "../../../api/API";
import ShowComment from "../../../sub/ShowComment";
import { format, parseISO } from "date-fns";
import CheckIcon from "/public/myprojectSVG/Check.svg";

interface Comment {
  commentIdx: number;
  comment: string;
  createdAt: string;
  isMe: string;
  isWriter: string;
  name: string;
  profileUrl: string;
  childComments: [];
}
interface File {
  fileName: string;
  url: string;
}
interface Task {
  description: string[];
  name: string;
  profileUrl: string | null;
}
interface MeetProps {
  title: string;
  writer: string;
  body: string;
  comments: Comment[];
  files: File[];
  tasks: Task[];
  isMe: string;
  createdAt: string;
  noteIdx: number;
}
const Container = styled.div`
  width: 100%;
  min-width: 550px;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const PostContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 3% 3% 0 3%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const PostInfo = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SettingWrapper = styled.div<{ height?: string }>`
  width: 100%;
  height: ${(props) => props.height + `rem`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  > svg {
    cursor: pointer;
  }
  .post_title {
    font-size: 1.125rem;
  }
  .post_info {
    font-size: 0.8rem;
    color: #ababab;
    padding: 0 7px;
    border-right: 0.8px solid #ababab;
  }
`;
const Content = styled.div`
  width: 100%;
  height: calc(100% - 5rem);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  margin-top: 1rem;
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
  .bottom_contents {
    height: 5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

const HtmlBody = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  > p {
    height: 1.5rem;
  }
`;

const VoteChoices = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Choice = styled.div<{ clicked?: boolean }>`
  width: 95%;
  height: 3.2rem;
  background: ${(props) => (props.clicked ? "#47d2d2" : "#ffffff")};
  color: ${(props) => (props.clicked ? "#ffffff" : "#000000")};
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-bottom: 20px;
  padding-left: 1.5rem;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  &:hover {
    border: 2px solid #47d2d2;
    cursor: pointer;
  }
  .add_button {
    width: 40px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #ffffff;
    background: #47d2d2;
    border-radius: 8px;
    cursor: pointer;
  }
`;
const ChoiceInput = styled.input`
  width: 95%;
  height: 2.5rem;
  font-size: 0.875rem;
  outline: none;
  border: none;
  &:focus {
    outline: none;
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
const SubmitButton = styled.div<{ isPossible?: boolean }>`
  width: 6rem;
  height: 2rem;
  text-align: center;
  border-radius: 0.5rem;
  background: ${(props) => (props.isPossible ? "#47d2d2" : "#c4c4c4")};
  color: #ffffff;
  line-height: 2rem;
  margin-left: 1rem;
  cursor: ${(props) => (props.isPossible ? "pointer" : "default")};
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

const MeetPost = () => {
  const router = useRouter();
  const { projectIdx, projectPostIdx } = router.query;
  const { data: session, status } = useSession();
  const [meetPost, setMeetPost] = useState<MeetProps>({
    body: "",
    comments: [],
    createdAt: "",
    files: [],
    isMe: "",
    noteIdx: null,
    tasks: [],
    title: "",
    writer: "",
  });

  const commentState = useAppSelector(
    (state: RootState) => state.comment.value
  );
  const dispatch = useAppDispatch();
  const getMeetPost = async () => {
    try {
      const res = await axios.get(API_URL + `teams/notes/${projectPostIdx}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      console.log(res.data.result);
      setMeetPost(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (session?.user) {
      getMeetPost();
    }
  }, [session]);

  //   const postComment = async () => {
  //     try {
  //       const response = await axios.post(
  //         API_URL + `teams/votes/${projectPostIdx}/comments`,
  //         { comment: reply, parentIdx: parentIdx },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${session.accessToken}`,
  //           },
  //         }
  //       );
  //       if (response.data.code === 1000) {
  //         setReply("");
  //         setParentIdx(null);
  //         getMeetPost();
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   const patchComment = async () => {
  //     try {
  //       const res = await axios.patch(
  //         API_URL + `teams/votes/comments/${commentState.idx}`,
  //         {
  //           comment: reply,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${session.accessToken}`,
  //           },
  //         }
  //       );
  //       if (res.data.code === 1000) {
  //         getMeetPost();
  //         setReply("");
  //       } else {
  //         alert("수정에 실패하였습니다.");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <Container>
      {/* <PostContainer>
        <PostInfo>
          <SettingWrapper height="3">
            <div className="post_title">{votePost.title}</div>
            {votePost.isMe === "1" && <MenuIcon />}
          </SettingWrapper>
          <SettingWrapper
            height="2"
            style={{
              justifyContent: "flex-start",
              borderBottom: "0.5px solid #dcdcdc",
            }}
          >
            {parseISO(votePost.endTime) < new Date() ? (
              <span className="post_info" style={{ borderLeft: "none" }}>
                진행중
              </span>
            ) : (
              <span className="post_info">마감됨</span>
            )}
            {votePost.isAnonymous ? (
              <span className="post_info">익명 투표</span>
            ) : (
              <span className="post_info">실명 투표</span>
            )}
            {votePost.isMultiple ? (
              <span className="post_info">복수선택</span>
            ) : (
              <span className="post_info">단일선택</span>
            )}
            <span className="post_info" style={{ borderRight: "none" }}>
            </span>
          </SettingWrapper>
        </PostInfo>
        <Content>
          <HtmlBody
            dangerouslySetInnerHTML={{ __html: votePost.description }}
          />
          <div className="bottom_contents">
            <Link href={`/myproject/${projectIdx}?tabNum=1`}>
              <BackToList>목록으로 돌아가기</BackToList>
            </Link>
          </div>
          <Comments>
            <ShowComment
              commentList={votePost.comments}
              setParentIdx={setParentIdx}
              getPost={getMeetPost}
            />
          </Comments>
        </Content>
      </PostContainer> */}
    </Container>
  );
};

export default MeetPost;
