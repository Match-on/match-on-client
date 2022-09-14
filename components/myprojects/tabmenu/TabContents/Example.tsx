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
interface ResumeUser {
  userIdx: number;
  nickname: string;
  profileUrl: string | null;
}
interface Resume {
  body: string;
  user: ResumeUser;
}

interface StudyPost {
  studyIdx: number;
  hitCount: string;
  commentCount: string;
  isMe: string;
  title: string;
  body: string;
  comments: Comment[];
  resumes: Resume[] | null;
  category: string;
  region: string;
  isLike: string;
  count: number;
  isRecruiting: string;
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
  justify-content: space-between;
  align-items: center;
`;
const TagWrapper = styled.div`
  min-width: 16rem;
  height: 3rem;
  display: flex;
`;
const Tag = styled.div<{ background: string }>`
  min-width: 4rem;
  height: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  padding: 0.2rem;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 300;
  border-radius: 1rem;
  background: ${(props) => props.background};
`;
const SettingWrapper = styled.div`
  width: 8rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  > svg {
    cursor: pointer;
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
const StudyInfo = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .info_row {
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    .info_row_title {
      width: 3rem;
      color: #a6a6a6;
    }
  }
`;

const ProfileImg = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #47d2d2;
  margin-right: 1rem;
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

const VotePost = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [reply, setReply] = useState<string>("");
  const [parentIdx, setParentIdx] = useState<number>(null);

  const commentState = useAppSelector((state: RootState) => state.comment.value);
  const dispatch = useAppDispatch();
  //   useEffect(() => {
  //     if (session?.user) {
  //     }
  //   }, [session]);
  //   const postComment = async () => {
  //     try {
  //       const response = await axios.post(
  //         API_URL + `studies/${studyIdx}/comments`,
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
  //         getStudyPost();
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   const patchComment = async () => {
  //     try {
  //       const res = await axios.patch(
  //         API_URL + `studies/comments/${commentState.idx}`,
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
  //         getStudyPost();
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
      <PostContainer>
        <PostInfo>
          <SettingWrapper>
            <MenuIcon />
          </SettingWrapper>
        </PostInfo>
        <Content>
          <StudyInfo></StudyInfo>
          {/* <HtmlBody dangerouslySetInnerHTML={{ __html: studyPost.body }} /> */}

          <Link href={`/study`}>
            <BackToList>목록으로 돌아가기</BackToList>
          </Link>
          {/* <Comments>
            <ShowComment commentList={studyPost.comments} setParentIdx={setParentIdx} getPost={getStudyPost} />
          </Comments> */}
        </Content>
        <WriteComment>
          <div>
            {commentState.idx}에게{commentState.state}
          </div>
          {/* <InputComment
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
          ></InputComment> */}
          <WriteButton
            id="button_comment"
            // onClick={reply.length !== 0 ? (commentState.state !== "patch" ? postComment : patchComment) : undefined}
          >
            댓글 쓰기
          </WriteButton>
        </WriteComment>
      </PostContainer>
    </Container>
  );
};

export default VotePost;
