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
    height: "80%",
    top: "5%",
    bottom: "5%",
    left: "30%",
    right: "30%",
    backgroundColor: "white",
    borderRadius: "10px",
    border: "3px solid #47d2d2",
  },
  content: {
    border: "none",
    left: "4%", //30px
    right: "4%",
    top: "1%",
    bottom: "1%",
  },
};
const SearchContainer = styled.div`
  width: 100%;
  height: 5%;
  position: relative;
  border: 0;
  display: flex;
  align-items: center;
  svg {
    position: absolute;
    right: 1%;
  }
`;

const Search = styled.input`
  border: 0;
  padding-left: 10px;
  background-color: #eaeaea;
  width: 100%;
  height: 100%;
  outline: none;
`;

const SearchResult = styled.div`
  width: 100%;
  height: 90%;
  border: 1px solid black;
  border-top: none;
`;

const CloseButton = styled.div`
  position: relative;
  width: 100%;
  height: 5%;
  text-align: right;
  svg {
    cursor: pointer;
  }
`;
const UniversitySearchBar = ({ isOpen, handleOpen, setUniversity }) => {
  const [keyword, setKeyword] = useState<string>("");
  const onChangeKeyword = (e: React.FormEvent<HTMLInputElement>) => {
    fetchData();
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
    console.log("res", data1);
  }, [data1]);
  return (
    <Modal isOpen={isOpen} onRequesClose={handleOpen} ariaHideApp={false} style={customStyles}>
      <CloseButton>
        <Close onClick={handleOpen} />
      </CloseButton>
      <SearchContainer>
        <Search onChange={onChangeKeyword} />
        <SearchIcon />
      </SearchContainer>
      <SearchResult>{keyword}</SearchResult>
    </Modal>
  );
};

export default UniversitySearchBar;
