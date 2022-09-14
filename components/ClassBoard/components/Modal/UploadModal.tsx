import Modal from "react-modal";
import styled from "@emotion/styled";
//1367 645
import Close from "../../../../public/componentSVG/CloseButton.svg";
import EditorForm from "../../../sub/Editor";
import axios from "axios";
import { API_URL } from "../../../api/API";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import CustomCheck from "../../../../public/componentSVG/register/CustomCheck.svg";

const customStyles = {
  overlay: {
    width: "60%",
    height: "90%",
    top: "5%",
    bottom: "5%",
    left: "20%",
    right: "6%",
    backgroundColor: "white",
    borderRadius: "1.5rem",
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "spacebetween",
  },
};

const StyledModal = styled(Modal)`
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  .bottom {
    display: flex;
    margin-left: calc(100% - 11.5rem);
  }
  padding: 5%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 7%;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const Contents = styled.div`
  width: 100%;
  height: 90%;
`;

const UploadButton = styled.div<{ possible: boolean }>`
  width: 7rem;
  height: 2rem;
  background: ${(props) => (props.possible ? "#47d2d2" : "#aaaaaa")};
  border-radius: 0.5rem;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.possible ? "pointer" : "arrow")};
`;

const ContentInput = styled.input`
  width: 100%;
  height: 2rem;
  border: 0.5px solid #aaaaaa;
  border-radius: 8px;
  padding-left: 10px;
  margin-bottom: 2%;
  border: 1px solid #f1f1f1;
  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
  }
  :-ms-input-placeholder {
  }
`;

const Anonymous = styled.span`
  font-size: 0.75rem;
  width: 3.5rem;
  display: flex;
  justify-content: space-evenly;
  color: #989898;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 1rem;
`;

const UploadModal = ({ isOpen, handleOpen, lectureIdx, type }) => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const postBoard = () => {
    axios
      .post(
        API_URL + `lectures/${lectureIdx}/posts`,
        { type: type, title: title, body: body, isAnonymous: anonymous },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then(handleOpen)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(body.length);
  }, []);

  return (
    <StyledModal isOpen={isOpen} onRequesClose={handleOpen} ariaHideApp={false} style={customStyles}>
      <Header>
        <Title>
          {type === "free" && "자유게시판"}
          {type === "info" && "정보게시판"}
          {type === "team" && "팀원모집게시판"}
        </Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <Contents>
        <ContentInput placeholder="제목" onChange={(e) => setTitle(e.target.value)} />
        <EditorForm setBody={setBody} data={""} clickable={true} />
      </Contents>
      <div className="bottom">
        {type !== "team" && (
          <Anonymous onClick={() => setAnonymous((prev) => !prev)}>
            익명
            <CustomCheck fill={anonymous ? "#47d2d2" : "#aaaaaa"} />
          </Anonymous>
        )}

        <UploadButton
          onClick={title.length !== 0 && body.length !== 8 ? postBoard : undefined}
          possible={title.length !== 0 && body.length > 7}
        >
          등록
        </UploadButton>
      </div>
    </StyledModal>
  );
};

export default UploadModal;
