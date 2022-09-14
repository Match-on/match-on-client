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
  region: string;
  campus: string | null;
  address: string;
}

const customStyles = {
  overlay: {
    width: "800px",
    height: "85%",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "10px",
    border: "3px solid #47d2d2",
  },
  content: {
    width: "750px",
    border: "none",
    left: "20px", //30px
    right: "20px",
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
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
const ResultRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  /* grid-template-rows: 20px; */
  min-height: 30px;
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
const UniversitySearchBar = ({ isOpen, handleOpen, university, setUniversity }) => {
  const [keyword, setKeyword] = useState<string>("");
  const onChangeKeyword = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };
  const [keyItems, setKeyItems] = useState<univData[]>([]);
  const [data1, setData1] = useState("");
  const fetchData = () => {
    axios
      .get(API_URL + "univs/search", { params: { keyword: keyword } })
      .then((res) => {
        setKeyItems(res.data.result);
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

  const UniversitySelect = (name, campus, idx, domain) => {
    if (campus === null) {
      university["name"] = name;
    } else {
      university["name"] = name + " " + campus;
    }
    university["idx"] = idx;
    university["domain"] = domain;
    handleOpen();
  };
  return (
    <Modal isOpen={isOpen} onRequesClose={handleOpen} ariaHideApp={false} style={customStyles}>
      <ModalHeader>
        <div style={{ fontWeight: 600 }}>학교 검색</div>
        <CloseButton>
          <Close onClick={handleOpen} />
        </CloseButton>
      </ModalHeader>
      <SearchContainer>
        <Search placeholder="학교명을 검색하세요." onChange={onChangeKeyword} />
        <SearchButton onClick={() => setUniversity("ccc")}>학교 검색</SearchButton>
        {/*기능 추가해야 함 fetch하면 될듯*/}
      </SearchContainer>
      <SearchResult>
        <ResultHeader>
          <div>이름</div>
          <div>지역</div>
          <div>주소</div>
        </ResultHeader>
        <RowGroup>
          {keyItems.length === 0 && keyword.length > 0 ? (
            <div>등록되어 있지 않은 학교입니다.</div>
          ) : (
            keyItems.map((univ, i) => (
              <ResultRow
                key={`searchUniv-${i}`}
                onClick={() => UniversitySelect(univ.name, univ.campus, univ.univIdx, univ.domain)}
              >
                <div>
                  {univ.name} {univ.campus}
                </div>
                <div>{univ.region}</div>
                <div>{univ.address}</div>
              </ResultRow>
            ))
          )}
          {}
        </RowGroup>
      </SearchResult>
      <ConfirmButton onClick={handleOpen}>확인</ConfirmButton>
    </Modal>
  );
};

export default UniversitySearchBar;
