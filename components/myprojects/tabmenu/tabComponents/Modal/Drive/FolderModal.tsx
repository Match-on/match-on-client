import Modal from "react-modal";
import styled from "@emotion/styled";
//1367 645
import Close from "../../../../../../public/componentSVG/CloseButton.svg";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { API_URL } from "../../../../../api/API";

const customStyles = {
  overlay: {
    width: "52rem",
    height: "13.5rem",
    top: "calc(50% - 6rem)",
    left: "calc(50% - 26rem)",
    right: "6%",
    backgroundColor: "white",
    borderRadius: "1.5rem",
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflowY: "scroll",
  },
};

const StyledModal = styled(Modal)`
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  border: 1px solid #f1f1f1;
  border-radius: 1.5rem;
  .bottom {
    display: flex;
    justify-content: flex-end;
  }
  padding: 3%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

const CloseButton = styled.div`
  cursor: pointer;
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
  height: 2.3rem;
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

type Props = {
  isOpen: boolean;
  handleOpen: () => void;
  projectIdx: string | string[];
  folderIdx: number;
};
const FolderModal = ({ isOpen, handleOpen, projectIdx, folderIdx }: Props) => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    console.log();
  }, []);

  const isPossible = () => {
    return title.length > 0;
  };
  const createFolder = async () => {
    try {
      const res = await axios.post(
        API_URL + `teams/${projectIdx}/drives/folders`,
        { name: title, parentIdx: folderIdx },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      handleOpen();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequesClose={handleOpen}
      ariaHideApp={false}
      style={customStyles}
    >
      <Header>
        <Title>새 폴더</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <ContentInput
        placeholder="제목"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="bottom">
        <UploadButton
          possible={isPossible()}
          onClick={isPossible() ? createFolder : undefined}
        >
          등록
        </UploadButton>
      </div>
    </StyledModal>
  );
};

export default FolderModal;
