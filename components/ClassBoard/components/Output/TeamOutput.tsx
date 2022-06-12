import styled from "@emotion/styled";
import BackToTable from "../../../sub/Table/BackToTable";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

const TeamOutput = () => {
  return (
    <Container>
      <div>팀원 모집</div>
      <BackToTable />
    </Container>
  );
};

export default TeamOutput;
