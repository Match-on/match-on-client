import styled from "@emotion/styled";
import BackToTable from "../../Table/BackToTable";

const Container = styled.div`
  width: 100%;
  height: 80%;
  background-color: #ffffff;
`;

const SurveyPost = ({ id }) => {
  return (
    <Container>
      SurveyPost
      <div>{id}</div>
      <div>
        <BackToTable />
      </div>
    </Container>
  );
};

//redux에 내 user id도 있고 작성자 id도 얻을 수 있으니까 이게 둘 다 맞으면 버튼 띄우는 걸로
export default SurveyPost;
