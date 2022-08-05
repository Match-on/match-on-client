import styled from "@emotion/styled";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

const TopSection = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2%;
  .right-section {
    width: 20%;
    height: 100%;
    min-width: 230px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      width: 60%;
      height: 2.375rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.8rem;
      color: #ffffff;
      background: #47d2d2;
      border-radius: 0.625rem;
      cursor: pointer;
    }
  }
`;

const InputFilter = styled.input`
  width: 40%;
  min-width: 9.5rem;
  height: 60%;
  border-radius: 0.625rem;
  padding-left: 1%;
  border: none;
  background: #f2f6f6;
  color: #ababab;
  &:focus {
    outline: 2px solid #47d2d2;
  }
  ::-webkit-input-placeholder {
    margin-left: 20px;
  }
`;

const SortSelect = styled.div`
  width: 4.5rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #989898;
  font-size: 0.75rem;
  cursor: pointer;
`;

const SortOption = styled.div`
  position: absolute;
  height: 3rem;
  width: 4.5rem;
  border-radius: 0.625rem;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  margin-top: 4.3rem;
  > li {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 1.5rem;
    font-size: 0.75rem;
    padding: 5%;
    cursor: pointer;
    &:hover {
      color: #47d2d2;
      > svg {
        fill: #47d2d2;
      }
    }
  }
`;

const SurveyBoard = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("latest");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setFilterValue = (value) => {
    setFilter(value);
    setFilterOpen(false);
  };
  const returnIcon = () => {
    return <span style={{ color: "#47d2d2" }}>{filterOpen ? "▲" : "▼"}</span>;
  };
  return (
    <Container>
      <TopSection>
        <InputFilter
          type="text"
          placeholder="수업명을 검색하세요"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              console.log("enter");
            }
          }}
        />
        <div className="right-section">
          <SortSelect onClick={() => setFilterOpen((prev) => !prev)}>
            <span>분류 :</span>
            {filter === "latest" ? (
              <span style={{ color: "#47d2d2" }}>날짜</span>
            ) : (
              <span style={{ color: "#47d2d2" }}>인기</span>
            )}
            {returnIcon()}
          </SortSelect>
          {filterOpen && (
            <SortOption>
              <li onClick={() => setFilterValue("latest")}>날짜</li>
              <li onClick={() => setFilterValue("popular")}>인기</li>
            </SortOption>
          )}
          <div className="button" onClick={() => setIsOpen(true)}>
            설문조사 생성 -50
          </div>
        </div>
      </TopSection>
    </Container>
  );
};

export default SurveyBoard;
