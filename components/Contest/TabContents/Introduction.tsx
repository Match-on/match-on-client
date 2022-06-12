import styled from "@emotion/styled";
import Image from "next/image";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
`;

const ImageContainer = styled.div`
  width: 30%;
  height: 100%;
  padding: 0 3% 0 3%;
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 60%;
  object-position: left bottom;
`;

const ContestExplain = styled.div`
  width: 70%;
  height: 100%;
  padding: 2%;
`;

const data = {
  id: "1234567",
  category: "디자인",
  title: "잡코리아 디자인 공모전",
  start: "2022-06-20",
  deadline: "2022-07-02",
  seen: 15,
  comments: 3,
  imgsrc: "/contestSrc.jpeg",
};

const Introduction = () => {
  return (
    <Container>
      <ImageContainer>
        <ImageBox>
          <Image layout="fill" objectFit="contain" src={"/contestSrc.jpeg"} />
        </ImageBox>
      </ImageContainer>
      <ContestExplain>hihi</ContestExplain>
    </Container>
  );
};

export default Introduction;
