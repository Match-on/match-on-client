import styled from "@emotion/styled";
import SurveyIcon from "../../../public/componentSVG/survey/survey.svg";
interface VoteProps {
  count: string;
  endTime: string;
  isNew: number;
  title: string;
  voteIdx: number;
  key: number;
}
const Row = styled.div`
  width: 100%;
  height: calc(100% / 6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1% 2%;
  cursor: pointer;
  border: 1px solid black;
  &:hover {
    border-left: 4px solid #47d2d2;
    background: rgba(242, 246, 246, 0.5);
  }
`;

const Column = styled.div<{ width: number }>`
  height: 100%;
  width: ${(props) => props.width + "%"};
  font-size: 0.75rem;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
  .profileImg {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: red;
    margin-right: 0.25rem;
  }
  .user_info {
    display: flex;
    /* width: 3rem;
    justify-content: space-between; */
    align-items: center;
  }
  .title {
    margin-left: 1rem;
    display: flex;
    align-items: center;
  }
  .body {
    margin-top: 0.25rem;
    height: calc(100% - 1.5rem);
  }
  > div {
    display: flex;
  }
`;
export const VoteRow = (props: VoteProps) => {
  return (
    <Row>
      <Column width={15}>
        <SurveyIcon fill={props.isNew ? "#47d2d2" : "#aaaaaa"} />
      </Column>
      <Column width={70}></Column>
      <Column width={15}></Column>
    </Row>
  );
};
// count: "0/3"
// endTime: "2022-08-12T20:51:00.000Z"
// isNew: 1
// title: "테스트33"
// voteIdx: 3
