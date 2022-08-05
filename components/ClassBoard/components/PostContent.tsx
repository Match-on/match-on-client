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
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  padding: 3%;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const Content = styled.div`
  width: 100%;
  border-bottom: 0.5px solid #dcdcdc;
  padding-bottom: 1rem;
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
  }
`;

const Detail = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
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

const Comments = styled.div`
  width: 100%;
  padding-bottom: 3rem;
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
  position: absolute;
  bottom: -2%;
  width: 95%;
  height: 4.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #ffffff;
  border-top: 1px solid #dcdcdc;
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

const PostContent = ({ postIdx }) => {
  const router = useRouter();
  const { lectureIdx, type } = router.query;
  console.log("query", router.query);

  const { data: session, status } = useSession();
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
  });
  const [reply, setReply] = useState<string>("");
  const getPostContent = async () => {
    try {
      const response = await axios.get(API_URL + `lectures/posts/${postIdx}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      setDetail(response.data.result);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const postComment = async () => {
    try {
      const response = await axios.post(
        API_URL + `lectures/posts/${postIdx}/comments`,
        { type: type, comment: reply },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (response.data.code === 1000) {
        setReply("");
        getPostContent();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPostContent();
  }, [session]);

  return (
    <Container>
      <Content>
        <Detail>
          <ProfileImg></ProfileImg>
          <Info>
            <div className="nickname">{detail.writer}</div>
            <div className="created">
              {typeof detail.createdAt === "string" && format(parseISO(detail.createdAt), "yyyy-MM-dd")}
            </div>
          </Info>
        </Detail>
        <span className="body" dangerouslySetInnerHTML={{ __html: detail.body }} />
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
          <Link href={`/classboard/${lectureIdx}`}>
            <BackToList>목록으로 돌아가기</BackToList>
          </Link>
        </div>
      </Content>
      <Comments>
        <ShowComment commentList={detail.comments} />
      </Comments>
      <WriteComment>
        <InputComment
          type="text"
          id="input_comment"
          value={reply}
          placeholder="댓글을 작성하세요."
          onChange={(e) => setReply(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              postComment();
            }
          }}
        ></InputComment>
        <WriteButton onClick={reply.length !== 0 ? postComment : undefined}>댓글 쓰기</WriteButton>
      </WriteComment>
    </Container>
  );
};

export default PostContent;

// body: "<p>sdf</p>\n<p>sdf</p>\n<p>sd</p>\n<p>f</p>\n<p>s</p>\n<p>sdfsdfdfsdfsdfsdf</p>\n<p>s</p>\n<p>ss</p>\n<p></p>\n<p>s</p>\n<p>s</p>\n"
// commentCount: "7"
// comments: Array(4)
// 0:
// childComments: Array(3)
// 0:
// comment: "대댓글 테스트22222 id ccccc1234"
// commentIdx: 5
// createdAt: "2022-08-02T10:11:41.749Z"
// isMe: "0"
// isWriter: "0"
// name: "익명 2"
// profileUrl: null
// [[Prototype]]: Object
// 1:
// comment: "대댓글 테스트 id ccccc1234"
// commentIdx: 4
// createdAt: "2022-08-02T10:11:37.042Z"
// isMe: "0"
// isWriter: "0"
// name: "익명 2"
// profileUrl: null
// [[Prototype]]: Object
// 2:
// comment: "대댓글 테스트 id bbbbb1234"
// commentIdx: 3
// createdAt: "2022-08-02T10:10:53.055Z"
// isMe: "0"
// isWriter: "0"
// name: "익명 1"
// profileUrl: null
// [[Prototype]]: Object
// length: 3
// [[Prototype]]: Array(0)
// comment: "댓글 테스트 id bbbbb1234"
// commentIdx: 1
// createdAt: "2022-08-02T10:10:11.854Z"
// isMe: "0"
// isWriter: "0"
// name: "익명 1"
// profileUrl: null
// [[Prototype]]: Object
// 1:
// childComments: []
// comment: "2번째 댓글 테스트 id bbbbb1234"
// commentIdx: 2
// createdAt: "2022-08-02T10:10:26.507Z"
// isMe: "0"
// isWriter: "0"
// name: "익명 1"
// profileUrl: null
// [[Prototype]]: Object
// 2:
// childComments: []
// comment: "댓글 테스트 id ccccc1234"
// commentIdx: 6
// createdAt: "2022-08-02T10:11:50.249Z"
// isMe: "0"
// isWriter: "0"
// name: "익명 2"
// profileUrl: null
// [[Prototype]]: Object
// 3:
// childComments: []
// comment: "댓글 테스트 id ccccc1234"
// commentIdx: 7
// createdAt: "2022-08-02T10:12:43.481Z"
// isMe: "0"
// isWriter: "0"
// name: "익명 2"
// profileUrl: null
// [[Prototype]]: Object
// length: 4
// [[Prototype]]: Array(0)
// createdAt: "2022-08-02T09:25:22.777Z"
// hitCount: "1"
// isMe: "1"
// lecturePostIdx: 20
// profileUrl: null
// title: "sdfsd"
// writer: "테스터"
