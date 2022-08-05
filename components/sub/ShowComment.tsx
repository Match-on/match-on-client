import styled from "@emotion/styled";
import Child from "../../public/componentSVG/ChildComment.svg";
import Menu from "../../public/componentSVG/Menu.svg";

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

const ShowComment = ({ commentList }) => {
  const onClickReply = () => {
    document.getElementById("input_comment").focus();
  };
  return (
    <div>
      {commentList.map((parent, i) => {
        return (
          <>
            {/* <ParentComment key={`parent-${i}`}>{parent.comment}</ParentComment> */}
            <ParentComment key={`parent-${i}`}>
              <Content>
                <LeftSide>
                  <Profile>
                    <div className="img" />
                    <div className="nickname">
                      {parent.isWriter === "1" ? <span className="writer">글쓴이</span> : <span>{parent.name}</span>}
                    </div>
                  </Profile>
                  <Comment>{parent.comment}</Comment>
                </LeftSide>
                <RightSide>
                  {parent.isMe === "1" ? <Menu /> : <div style={{ width: "50%" }}>hi</div>}
                  <AppendChild onClick={onClickReply}>답글 달기</AppendChild>
                </RightSide>
              </Content>
            </ParentComment>
            {parent.childComments.map((child, idx) => (
              <ChildComment key={`child-${idx}`}>
                <Child />
                <ChildContent>
                  <LeftSide>
                    <Profile>
                      <div className="img" />
                      <div className="nickname">
                        {child.isWriter === "1" ? <span className="writer">글쓴이</span> : <span>{parent.name}</span>}
                      </div>
                    </Profile>
                    <Comment>{child.comment}</Comment>
                  </LeftSide>
                  <RightSide>{child.isMe === "1" ? <Menu /> : <div />}</RightSide>
                </ChildContent>
              </ChildComment>
            ))}
          </>
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
