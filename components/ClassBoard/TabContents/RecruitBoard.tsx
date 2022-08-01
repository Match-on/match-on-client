import styled from "@emotion/styled";
import { useMemo, useState } from "react";
import ClassTable from "../components/ClassTable";
import UploadModal from "../components/Modal/UploadModal";

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

const RecruitBoard = ({ lectureIdx }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      {isOpen && <UploadModal isOpen={isOpen} handleOpen={handleModalOpen} lectureIdx={lectureIdx} type="team" />}
    </Container>
  );
};

export default RecruitBoard;
