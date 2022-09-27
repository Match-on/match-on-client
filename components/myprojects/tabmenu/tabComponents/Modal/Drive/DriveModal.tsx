import Modal from "react-modal";
import styled from "@emotion/styled";
//1367 645
import Close from "../../../../../../public/componentSVG/CloseButton.svg";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { API_URL } from "../../../../../api/API";
import MeetEditor from "../../../../../sub/MeetEditor";
import UploadFile from "../../../../../sub/UploadFile";
import FileContainer from "../../../../../sub/FileContainer";

interface Todo {
  isOpen: boolean;
  member: { name: string; idx: number };
  todo: string;
  date: Date;
}

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
  padding: 1rem;
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
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
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
interface File {
  fileName: string;
  url: string;
}
const NoticeModal = ({ isOpen, handleOpen, projectIdx, folderIdx }: Props) => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File>({ fileName: "", url: "" });
  const [files, setFiles] = useState<File[]>([]);

  const isPossible = () => {
    return title.length > 0;
  };
  const postNotice = async () => {
    try {
      const res = await axios.post(
        API_URL + `teams/${projectIdx}/drives`,
        {
          title: title,
          body: description,
          files: files,
          folderIdx: folderIdx,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      console.log(res);

      handleOpen();
    } catch (err) {
      console.log(err.response.data);
    }
  };
  useEffect(() => {
    if (file.fileName !== "" && file.url !== "") {
      setFiles([...files, file]);
      setFile({ fileName: "", url: "" });
    }
  }, [file]);

  return (
    <StyledModal
      isOpen={isOpen}
      onRequesClose={handleOpen}
      ariaHideApp={false}
      style={customStyles}
    >
      <Header>
        <Title>드라이브 업로드</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <Contents>
        <ContentInput
          placeholder="제목"
          onChange={(e) => setTitle(e.target.value)}
        />
        <MeetEditor
          setBody={setDescription}
          data={""}
          clickable={true}
          placeholder={"글을 입력하세요."}
        />
        {files.map((f, idx) => (
          <FileContainer
            fileName={f.fileName}
            url={f.url}
            key={`file_${idx}`}
          />
        ))}
        <UploadFile file={file} setFile={setFile} />
      </Contents>
      <div className="bottom">
        <UploadButton
          possible={isPossible()}
          onClick={isPossible() ? postNotice : undefined}
        >
          등록
        </UploadButton>
      </div>
    </StyledModal>
  );
};

export default NoticeModal;
