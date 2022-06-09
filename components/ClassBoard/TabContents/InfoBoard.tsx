import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  height: 83%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
`;

const InfoBoard = () => {
  return (
    <Container>
      <div>정보게시판</div>
    </Container>
  );
};

export default InfoBoard;
