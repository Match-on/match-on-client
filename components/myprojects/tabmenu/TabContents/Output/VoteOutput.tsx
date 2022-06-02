import styled from "@emotion/styled";
import BackToTable from "../../../../sub/Table/BackToTable";

const Container = styled.div`
  width: 100%;
  height: 80%;
  background-color: #ffffff;
`;
const VoteOutput = ({ id }) => {
  return (
    <Container>
      VoteOutput
      <div>{id}</div>
      <div>
        <BackToTable />
      </div>
    </Container>
  );
};

export default VoteOutput;
