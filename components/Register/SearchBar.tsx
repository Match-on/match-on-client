import Modal from "react-modal";
import styled from "@emotion/styled";
import SearchIcon from "../../public/register/SearchIcon.svg";
import Close from "../../public/componentSVG/CloseButton.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api/API";
interface univData {
  univIdx: number;
  name: string;
  domain: string;
}

const customStyles = {
  overlay: {
    width: "40%",
    minWidth: "600px",
    height: "85%",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "10px",
    border: "3px solid #47d2d2",
  },
  content: {
    border: "none",
    left: "4%", //30px
    right: "4%",
    top: "1%",
    bottom: "3%",
  },
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 8%;
  min-height: 30px;
  div {
    font-weight: 600;
  }
`;
const SearchContainer = styled.div`
  width: 100%;
  height: 5%;
  min-height: 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3%;
`;

const Search = styled.input`
  border: 0.5px solid #aaaaaa;
  padding-left: 10px;
  width: 82%;
  height: 100%;
  outline: none;
  border-radius: 8px;
`;

const SearchButton = styled.button`
  width: 16%;
  font-size: 0.8rem;
  color: white;
  background-color: #47d2d2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const SearchResult = styled.div`
  width: 100%;
  height: 78%;
  border-radius: 8px;
  border: 0.5px solid #aaaaaa;
  padding: 2%;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ResultHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  font-size: 0.8rem;
  color: #aaaaaa;
  line-height: 2rem;
  border-bottom: 0.5px solid #aaaaaa;
`;
const RowGroup = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: calc(98% - 2rem);
`;
const ResultRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-rows: 20px;
  font-size: 0.9rem;
  margin: 5px;
  &:hover {
    cursor: pointer;
    color: #47d2d2;
  }
`;

const CloseButton = styled.div`
  position: relative;
  height: 5%;
  text-align: right;
  svg {
    cursor: pointer;
  }
`;

const ConfirmButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16%;
  height: 5%;
  font-size: 0.8rem;
  color: white;
  background-color: #47d2d2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
const UniversitySearchBar = ({ isOpen, handleOpen, setUniversity }) => {
  const [keyword, setKeyword] = useState<string>("");
  const onChangeKeyword = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };
  const [keyItems, setKeyItems] = useState<univData[]>([]);
  const [data1, setData1] = useState("");
  const fetchData = () => {
    const params = { keyword: keyword };
    axios
      .get(API_URL + "univs/search", { params: { keyword: keyword } })
      .then((res) => {
        setData1(JSON.stringify(res));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) fetchData();
    }, 300);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);
  useEffect(() => {
    console.log(data1);
  }, [data1]);
  return (
    <Modal isOpen={isOpen} onRequesClose={handleOpen} ariaHideApp={false} style={customStyles}>
      <ModalHeader>
        <div style={{ fontWeight: 600 }}>학교 검색</div>
        <CloseButton>
          <Close onClick={handleOpen} />
        </CloseButton>
      </ModalHeader>
      <SearchContainer>
        <Search onChange={onChangeKeyword} />
        <SearchButton>학교 검색</SearchButton>
        {/*기능 추가해야 함 fetch하면 될듯*/}
      </SearchContainer>
      <SearchResult>
        <ResultHeader>
          <div>이름</div>
          <div>지역</div>
          <div>주소</div>
        </ResultHeader>
        <RowGroup></RowGroup>
      </SearchResult>
      <ConfirmButton onClick={handleOpen}>확인</ConfirmButton>
    </Modal>
  );
};

export default UniversitySearchBar;
