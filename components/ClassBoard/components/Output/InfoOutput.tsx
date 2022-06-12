import styled from "@emotion/styled";
import BackToTable from "../../../sub/Table/BackToTable";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

const InfoOutput = () => {
  return (
    <Container>
      <div>정보 및 자유게시판</div>
      <BackToTable />
    </Container>
  );
};

export default InfoOutput;
