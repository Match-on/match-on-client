import styled from "@emotion/styled";
import BackToTable from "../../sub/Table/BackToTable";

const Container = styled.div`
  width: 100%;
  height: 80%;
  background-color: #ffffff;
`;

const SurveyResult = ({ id }) => {
  return (
    <Container>
      SurveyResult
      <div>{id}</div>
      <div>
        <BackToTable />
      </div>
    </Container>
  );
};

export default SurveyResult;
