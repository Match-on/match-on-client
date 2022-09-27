import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../../src/hooks/hooks";
import MenuIcon from "/public/componentSVG/Menu.svg";
import { unCommentAction } from "../../../../src/redux/reducers/comment";
import { RootState } from "../../../../src/redux/store";
import { API_URL } from "../../../api/API";
import ShowComment from "../../../sub/ShowComment";
import { format, parseISO } from "date-fns";
import CheckIcon from "/public/myprojectSVG/Check.svg";
interface Choice {
  choiceIdx: number;
  count: number;
  description: string;
  imageUrl: string;
  isMe: boolean;
  voter: string[] | null;
}
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
interface VoteProps {
  choices: Choice[];
  comments: Comment[];
  count: string;
  description: string;
  endTime: string;
  isAddable: boolean;
  isAnonymous: boolean;
  isMe: string;
  isMultiple: boolean;
  title: string;
  voteIdx: number;
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
interface ChoiceProps {
  clicked?: boolean;
  isSelected?: boolean;
  isEnd: boolean;
  isMe?: boolean;
}
const Choice = styled.div<ChoiceProps>`
  width: 100%;
  height: 3.2rem;
  background: ${(props) =>
    props.clicked && !props.isMe ? "#47d2d2" : "#ffffff"};
  color: ${(props) => (props.clicked || props.isMe ? "#47d2d2" : "#ffffff")};
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 0.875rem;
  &:hover {
    border: 2px solid #47d2d2;
    cursor: ${(props) => (props.isMe ? "default" : "pointer")};
  }
  .flex_between {
    display: flex;
    justify-content: space-between;
    color: ${(props) => (props.isMe ? "#47d2d2" : "#ababab")};
    font-weight: ${(props) => props.isMe && "600"};
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
const ChoiceBar = styled.div<{ count; member }>`
  width: ${(props) => `${(props.count / props.member) * 100}%`};
  height: 3px;
  background-color: #47d2d2;
  margin-bottom: 20px;
  margin-left: 5px;
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

const VotePost = () => {
  const router = useRouter();
  const { projectIdx, projectPostIdx } = router.query;
  const { data: session, status } = useSession();
  const [votePost, setVotePost] = useState<VoteProps>({
    choices: [],
    comments: [],
    count: "",
    description: "",
    endTime: "",
    isAddable: false,
    isAnonymous: false,
    isMe: "",
    isMultiple: false,
    title: "",
    voteIdx: null,
  });
  const [myChoices, setMyChoices] = useState<number[]>([]);
  const [isEnd, setIsEnd] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number>(null);
  const [choiceIdx, setChoiceIdx] = useState<number[]>([]);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [addedChoice, setAddedChoice] = useState<string>("");
  const [reply, setReply] = useState<string>("");
  const [parentIdx, setParentIdx] = useState<number>(null);

  const commentState = useAppSelector(
    (state: RootState) => state.comment.value
  );
  const dispatch = useAppDispatch();
  const getVotePost = async () => {
    try {
      const res = await axios.get(API_URL + `teams/votes/${projectPostIdx}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      const voteEndTime = parseISO(res.data.result.endTime);
      if (voteEndTime < new Date()) {
        setIsEnd(true);
      }
      res.data.result.endTime = format(voteEndTime, "yyyy.MM.dd kk.mm");

      res.data.result.choices.forEach((el) => {
        if (el.isMe) {
          myChoices.push(el.choiceIdx);
        }
      });

      console.log(res.data.result);
      setVotePost(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (session?.user) {
      getVotePost();
    }
    console.log("mychoices", myChoices);
  }, [session]);
  function isExistIdx(idx) {
    return choiceIdx.includes(idx);
  }
  function isSubmitPossible() {
    return choiceIdx.length > 0;
  }
  const handleChoiceIdx = (idx) => {
    if (isExistIdx(idx)) {
      setChoiceIdx(choiceIdx.filter((prevIdx) => prevIdx != idx));
    } else {
      setChoiceIdx((prev) => [...prev, idx]);
    }
  };
  const addChoice = async () => {
    try {
      const res = await axios.post(
        API_URL + `teams/votes/${projectPostIdx}/choices`,
        { description: addedChoice },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      setIsAdd(false);
      getVotePost();
    } catch (err) {
      console.log(err);
    }
  };
  const submitChoice = async () => {
    try {
      const res = await axios.post(
        API_URL + `teams/votes/${projectPostIdx}/vote`,
        { choices: choiceIdx },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      getVotePost();
    } catch (err) {
      console.log(err.response);
    }
  };
  const postComment = async () => {
    try {
      const response = await axios.post(
        API_URL + `teams/votes/${projectPostIdx}/comments`,
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
        getVotePost();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const patchComment = async () => {
    try {
      const res = await axios.patch(
        API_URL + `teams/votes/comments/${commentState.idx}`,
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
        getVotePost();
        setReply("");
      } else {
        alert("수정에 실패하였습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (isEnd) {
      const maxChoice = Math.max(
        ...votePost.choices.map((c) => c.choiceIdx),
        0
      );
      setSelectedChoice(maxChoice);
    }
  }, [isEnd]);

  return (
    <Container>
      <PostContainer>
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
            {!isEnd ? (
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
              마감일 {votePost.endTime}
            </span>
          </SettingWrapper>
        </PostInfo>
        <Content>
          <HtmlBody
            dangerouslySetInnerHTML={{ __html: votePost.description }}
          />
          <VoteChoices>
            {votePost.choices.map((choice, idx) => (
              <div key={idx} style={{ width: "95%" }}>
                <Choice
                  onClick={() => handleChoiceIdx(choice.choiceIdx)}
                  clicked={isExistIdx(choice.choiceIdx)}
                  isEnd={isEnd}
                  isMe={myChoices.includes(choice.choiceIdx)}
                >
                  <div className="flex_between">
                    <div style={{ display: "flex" }}>
                      {myChoices.includes(choice.choiceIdx) ? (
                        <CheckIcon
                          style={{ marginRight: "1rem" }}
                          stroke="#47d2d2"
                        />
                      ) : (
                        isExistIdx(choice.choiceIdx) && (
                          <CheckIcon
                            style={{ marginRight: "1rem" }}
                            stroke="#ffffff"
                          />
                        )
                      )}

                      <p>{choice.description}</p>
                    </div>
                    <p>{choice.count}명</p>
                  </div>
                </Choice>
                <ChoiceBar
                  count={choice.count}
                  member={parseInt(votePost.count.split("/")[1])}
                />
              </div>
            ))}
            {isAdd && (
              <Choice style={{ paddingLeft: "0.2rem" }} isEnd={isEnd}>
                <ChoiceInput
                  type={"text"}
                  onChange={(e) => setAddedChoice(e.target.value)}
                />
                <div
                  className="add_button"
                  onClick={() =>
                    addedChoice.length > 0 ? addChoice() : undefined
                  }
                >
                  추가
                </div>
              </Choice>
            )}
            {votePost.isAddable && !isEnd && (
              <Choice
                style={{ color: "#aaaaaa" }}
                onClick={() => setIsAdd(true)}
                isEnd={isEnd}
              >
                + 항목 추가하기
              </Choice>
            )}
          </VoteChoices>
          <div className="bottom_contents">
            <Link href={`/myproject/${projectIdx}?tabNum=4`}>
              <BackToList>목록으로 돌아가기</BackToList>
            </Link>
            {isEnd ? (
              <SubmitButton isPossible={false}>마감</SubmitButton>
            ) : myChoices.length === 0 ? (
              <SubmitButton
                isPossible={isSubmitPossible()}
                onClick={() =>
                  isSubmitPossible() ? submitChoice() : undefined
                }
              >
                완료
              </SubmitButton>
            ) : (
              <SubmitButton
                isPossible={true}
                onClick={() => {
                  setMyChoices([]);
                  {
                    isSubmitPossible() ? submitChoice() : undefined;
                  }
                }}
              >
                다시 하기
              </SubmitButton>
            )}
          </div>
          <Comments>
            <ShowComment
              commentList={votePost.comments}
              setParentIdx={setParentIdx}
              getPost={getVotePost}
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

export default VotePost;
