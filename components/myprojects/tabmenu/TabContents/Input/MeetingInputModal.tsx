import Modal from "react-modal";
import styled from "@emotion/styled";
//1367 645
import Close from "../../../../../public/componentSVG/CloseButton.svg";
import EditorForm from "../../../../sub/Editor";

const customStyles = {
  overlay: {
    width: "60%",
    height: "90%",
    top: "5%",
    bottom: "5%",
    left: "20%",
    right: "6%",
    backgroundColor: "white",
    borderRadius: "25px",
  },
  content: {
    border: "none",
    left: "4%", //30px
    right: "4%",
    top: "4%",
  },
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4%;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentBox = styled.div`
  width: 100%;
  height: 10%;
  border: 0.5px solid #aaaaaa;
  border-radius: 8px;
`;

const ContetnInput = styled.input`
  width: 100%;
  height: 10%;
  border: 0.5px solid #aaaaaa;
  border-radius: 8px;
  padding-left: 10px;
  ::placeholder,
  ::-webkit-input-placeholder {
  }
  :-ms-input-placeholder {
  }
`;
const MeetingInputModal = ({ isOpen, handleOpen }) => {
  return (
    <Modal isOpen={isOpen} onRequesClose={handleOpen} ariaHideApp={false} style={customStyles}>
      <Header>
        <Title>일정 추가</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <Contents>
        {/* <ContentBox></ContentBox>
        <ContetnInput placeholder="dd"></ContetnInput> */}
        {/* <EditorForm /> */}
      </Contents>
    </Modal>
  );
};

export default MeetingInputModal;
