import styled from "@emotion/styled";
import BackToTable from "../../Table/BackToTable";

const Container = styled.div`
  width: 100%;
  height: 80%;
  background-color: #ffffff;
`;
const NoticeOutput = ({ id }) => {
  return (
    <Container>
      NoticeOutput
      <div>{id}</div>
      <div>
        <BackToTable />
      </div>
    </Container>
  );
};

export default NoticeOutput;
