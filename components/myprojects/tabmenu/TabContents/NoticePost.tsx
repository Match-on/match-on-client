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
import FileContainer from "../../../sub/FileContainer";
import getFileExtension from "../../../sub/checkExtenstion";
import ImageContainer from "../../../sub/ImageContainer";

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

interface NoticeProps {
  title: string;
  writer: string;
  body: string;
  comments: Comment[];
  files: File[];
  isMe: string;
  createdAt: string;
  noticeIdx: number;
  team: { teamIdx: number };
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
  @media screen and (max-width: 1024px) {
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

const SettingWrapper = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 0.5px solid #dcdcdc;
  padding-bottom: 0.8rem;
  > svg {
    cursor: pointer;
  }
  .post_title {
    font-size: 1.125rem;
  }
  .post_info {
    font-size: 0.8rem;
    color: #ababab;
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
const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const NoticePost = () => {
  const router = useRouter();
  const { projectIdx, projectPostIdx } = router.query;
  const { data: session, status } = useSession();
  const [noticePost, setNoticePost] = useState<NoticeProps>({
    body: "",
    comments: [],
    createdAt: "",
    files: [],
    isMe: null,
    noticeIdx: null,
    title: "",
    writer: "",
    team: { teamIdx: null },
  });
  const [reply, setReply] = useState<string>("");
  const [parentIdx, setParentIdx] = useState<number>(null);

  const commentState = useAppSelector(
    (state: RootState) => state.comment.value
  );
  const dispatch = useAppDispatch();
  const getNoticePost = async () => {
    try {
      const res = await axios.get(API_URL + `teams/notices/${projectPostIdx}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      res.data.result.createdAt = format(
        parseISO(res.data.result.createdAt),
        "yyyy.MM.dd kk.mm"
      );
      setNoticePost(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (session?.user) {
      getNoticePost();
    }
  }, [session]);

  const postComment = async () => {
    try {
      const response = await axios.post(
        API_URL + `teams/notices/${projectPostIdx}/comments`,
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
        getNoticePost();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const patchComment = async () => {
    try {
      const res = await axios.patch(
        API_URL + `teams/notices/comments/${commentState.idx}`,
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
        getNoticePost();
        setReply("");
      } else {
        alert("수정에 실패하였습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <PostContainer>
        <PostInfo>
          <SettingWrapper>
            <div className="post_title">{noticePost.title}</div>
            <div className="post_info">
              {noticePost.createdAt}
              &nbsp;&nbsp;
              {noticePost.writer}
            </div>
          </SettingWrapper>
        </PostInfo>
        <Content>
          <HtmlBody dangerouslySetInnerHTML={{ __html: noticePost.body }} />
          <ImageWrapper>
            {noticePost.files.map((fi, idx) => {
              if (getFileExtension(fi.fileName)) {
                return (
                  <ImageContainer
                    fileName={fi.fileName}
                    url={fi.url}
                    key={`fi_${idx}`}
                  />
                );
              }
            })}
          </ImageWrapper>
          <div className="bottom_contents">
            <Link href={`/myproject/${projectIdx}?tabNum=1`}>
              <BackToList>목록으로 돌아가기</BackToList>
            </Link>
          </div>
          {noticePost.files.map((f, idx) => (
            <FileContainer
              fileName={f.fileName}
              url={f.url}
              key={`file_${idx}`}
            />
          ))}
          <Comments>
            <ShowComment
              commentList={noticePost.comments}
              setParentIdx={setParentIdx}
              getPost={getNoticePost}
            />
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
            onClick={
              reply.length !== 0
                ? commentState.state !== "patch"
                  ? postComment
                  : patchComment
                : undefined
            }
          >
            댓글 쓰기
          </WriteButton>
        </WriteComment>
      </PostContainer>
    </Container>
  );
};

export default NoticePost;
