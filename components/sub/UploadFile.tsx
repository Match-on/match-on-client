import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { storage } from "../../components/Register/firebase";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";

const UploadWrapper = styled.div`
  width: 100%;
  height: 2rem;
  border: 0.5px solid #dcdcdc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.5rem;
  .file_label {
    font-size: 0.75rem;
    color: #d1d1d1;
  }
  .upload_button {
    width: 5rem;
    height: 1.5rem;
    background-color: #47d2d2;
    color: #ffffff;
    text-align: center;
    line-height: 1.5rem;
    border-radius: 5px;
    font-size: 0.75rem;
    cursor: pointer;
  }
`;

interface File {
  fileName: string;
  url: string;
}

interface FileProps {
  fileUrl?: string;
  file: File;
  setFile: Dispatch<SetStateAction<File>>;
}
const UploadFile: React.FC<FileProps> = ({
  fileUrl = uuidv4(),
  file,
  setFile,
}) => {
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
      setFile({ ...file, fileName: files[0].name });

      const theImage = files[0];

      const reader: FileReader = new FileReader();
      setFileUpload(theImage);
      reader.onloadend = () => {
        const fileUrl = reader.result.toString();
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
        setFile({ ...file, url: url });
      }); //그냥 올리고 store안하고 삭제하면 오류 뜸.
    });
  };
  const clearFile = async () => {
    setFileUpload(null);
    deleteObject(fileRef).catch((err) => {
      alert(err);
    });
    setFileRef(null);
  };
  useEffect(() => {
    storeFile();
  }, [fileUpload]);

  return (
    <UploadWrapper>
      <label className="file_label">파일 업로드</label>
      <input
        id="file_input"
        type={"file"}
        onChange={(e) => onFileChange(e)}
        style={{ position: "absolute", clip: "rect(0,0,0,0)", width: "0" }}
      />
      <label className="upload_button" htmlFor="file_input">
        내 PC
      </label>
    </UploadWrapper>
  );
};

export default UploadFile;

//display file을 넘겨줘서 본 컴포넌트에서 저장을 하고
//image url도 본 컴포넌트에서 uuid를 이용해서 생성하고 넘겨줘야 할 듯.
//image url은 서버에 보내야 하고, display는 미리보기 처럼 클릭하면 볼 수 있게끔.
//mode는 추가모드랑 그냥 보는 모드로 설정하고, 이러면 display를 안념겨줘도 됨.

//총 받아야 할 게 size랑 이미지 url
