import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../../components/Register/firebase";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";

const FileWrapper = styled.img<{ width: number; height: number }>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
`;

interface FileProps {
  size?: number[];
  fileUrl?: string;
  displayUrl?: string;
  mode?: string;
  setDisplay?: (file: string) => void;
}
const FileContainer: React.FC<FileProps> = ({
  size = [100, 100],
  fileUrl = uuidv4(),
  displayUrl,
  mode = "",
  setDisplay,
}) => {
  const [displayFile, setDisplayFile] = useState<string>("");
  const [fileRef, setFileRef] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);
  const onFileChange = async (event) => {
    if (fileRef !== null) {
      console.log("fileRef", fileRef);
      // await clearFile();
    }
    if (event.target.value) {
      const {
        target: { files },
      } = event;

      const theImage = files[0];

      const reader: FileReader = new FileReader();
      setFileUpload(theImage);
      reader.onloadend = () => {
        const fileUrl = reader.result.toString();
        setDisplayFile(fileUrl);
      };
      reader.readAsDataURL(theImage);
    }
  };
  const storeFile = () => {
    if (fileUpload === null) return;
    const fileRef = ref(storage, `${fileUrl}`);
    setFileRef(fileRef);
    uploadBytes(fileRef, fileUpload).then(() => {
      getDownloadURL(fileRef).then((url) => {
        console.log("url", url);
        setDisplay(url);
        setDisplayFile(url);
      }); //그냥 올리고 store안하고 삭제하면 오류 뜸.
    });
  };
  const clearFile = async () => {
    setFileUpload(null);
    setDisplayFile(null);
    deleteObject(fileRef).catch((err) => {
      alert(err);
    });
    setFileRef(null);
  };
  useEffect(() => {
    storeFile();
  }, [fileUpload]);
  if (mode === "add") {
    return <input type={"file"} onChange={(e) => onFileChange(e)} />;
  }
  return <FileWrapper src={displayUrl} width={size[0]} height={size[1]} />;
};

export default FileContainer;

//display file을 넘겨줘서 본 컴포넌트에서 저장을 하고
//image url도 본 컴포넌트에서 uuid를 이용해서 생성하고 넘겨줘야 할 듯.
//image url은 서버에 보내야 하고, display는 미리보기 처럼 클릭하면 볼 수 있게끔.
//mode는 추가모드랑 그냥 보는 모드로 설정하고, 이러면 display를 안념겨줘도 됨.

//총 받아야 할 게 size랑 이미지 url
