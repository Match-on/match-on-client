import Modal from "react-modal";
import styled from "@emotion/styled";
//1367 645
import Close from "../../public/componentSVG/CloseButton.svg";
import EditorForm from "./Editor";
import axios from "axios";
import { API_URL } from "../api/API";
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
    height: 4rem;
    justify-content: flex-end;
    align-items: flex-end;
  }
  padding: 5%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
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
const Description = styled.div`
  font-size: 0.75rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #aaaaaa;
  .description_row {
    margin: 0.3rem 0;
  }
`;

const ResumeModal = ({ isOpen, handleOpen, postIdx, type }) => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const postResume = async () => {
    if (type === "lecture") {
      try {
        const res = await axios.post(
          API_URL + `lectures/posts/${postIdx}/resumes`,
          {
            body: body,
          },
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (type === "study") {
      try {
        const res = await axios.post(
          API_URL + `studies/${postIdx}/resumes`,
          {
            body: body,
          },
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
    handleOpen();
  };
  return (
    <StyledModal isOpen={isOpen} onRequesClose={handleOpen} ariaHideApp={false} style={customStyles}>
      <Header>
        <Title>지원서 작성</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <Contents>
        <EditorForm setBody={setBody} data={""} clickable={false} />
      </Contents>
      <Description>
        <div className="description_row">이미 작성 완료한 지원서는 수정/취소 할 수 없습니다.</div>
        <div className="description_row">작성자가 팀으로 초대하면 알림이 갑니다.</div>
        <div className="description_row">팀원으로 참여를 확인하시면 팀 페이지로 자동 초대 됩니다.</div>
      </Description>
      <div className="bottom">
        <UploadButton onClick={body.length !== 8 ? postResume : undefined} possible={body.length > 7}>
          등록
        </UploadButton>
      </div>
    </StyledModal>
  );
};

export default ResumeModal;
