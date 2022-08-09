import styled from "@emotion/styled";
import Child from "../../public/componentSVG/ChildComment.svg";
import { ChildRow, ParentRow } from "./CommentRow";

const ParentComment = styled.div`
  width: 100%;
  min-height: 5rem;
  background: #f2f6f6;
  margin: 1rem 0;
  border-radius: 10px;
`;

const ChildComment = styled.div`
  display: flex;
  width: 100%;
  min-height: 5rem;
  margin: 1rem 0;
  > svg {
    width: 4%;
    min-width: 1.5rem;
    max-width: 3rem;
  }
`;

const ShowComment = ({ commentList, setParentIdx, getPost }) => {
  return (
    <div>
      {commentList.map((parent, i) => {
        return (
          <div key={parent.commentIdx}>
            <ParentComment>
              <ParentRow {...parent} setParentIdx={setParentIdx} getPost={getPost} />
            </ParentComment>
            {parent.childComments.map((child, idx) => (
              <ChildComment key={child.commentIdx}>
                <Child />
                <ChildRow {...child} getPost={getPost} />
              </ChildComment>
            ))}
          </div>
        );
      })}
    </div>
  );
};

// const ShowComment = () => {
//   return (
//     <div>
//       <div>hihi</div>
//     </div>
//   );
// };

export default ShowComment;
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
