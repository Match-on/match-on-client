import styled from "@emotion/styled";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../components/api/API";
import { ClassBox } from "../../components/myprojects/components/BoxContainer";
import Carousel, { SlideButton } from "../../components/sub/Carousel";
import { RootState } from "../../src/redux/store";
import CustomCheck from "../../public/componentSVG/register/CustomCheck.svg";

import useIntersectionObserver from "../../src/hooks/useIntersectionObserver";
import ResultRow from "../../components/ClassBoard/components/ResultRow";
interface FavoriteClass {
  credit: number;
  instructor: string;
  lectureIdx: number;
  name: string;
  time: string;
  type: string;
}

interface Filter {
  years: string[];
  semesters: string[];
  grades: number[];
  types: string[];
}

interface Lecture {
  credit: number;
  department: string;
  favorite: number;
  grade: number;
  instructor: string;
  lectureIdx: number;
  name: string;
  semester: number;
  time: string;
  type: string;
  year: number;
}

const ClassPage = styled.div`
  width: calc(100% - 8%);
  margin-left: 4%;
  height: 100%;
`;

const ClassTitle = styled.div`
  width: 9.6em;
  font-size: 1.5rem;
  font-weight: 400;
  border-left: 0.25rem solid #50d5d5;
  padding-left: 5px;
`;

const SubTitle = styled.div`
  font-size: 1rem;
  font-weight: 400;
  /* margin: 2.5em 0 1em 0; */
  color: #aaaaaa;
`;

const ClassSearch = styled.div`
  width: 100%;
  margin-top: 5%;
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`; //1367

const InputFilter = styled.input`
  width: 34.1%;
  height: 2.3rem;
  border-radius: 0.625rem;
  padding-left: 1%;
  border: none;
  color: #ababab;
  &:focus {
    outline: none;
  }
  ::-webkit-input-placeholder {
    margin-left: 20px;
  }
`;

const InputSelect = styled.div`
  width: 13.1%;
  color: #ababab;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: none;
`;

const SelectTitle = styled.div`
  width: 100%;
  height: 2.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-radius: 0.625rem;
  padding: 0 10%;
`;

const SelectOption = styled.ul`
  position: absolute;
  width: 12.5%;
  border-radius: 0.625rem;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  margin-top: 2.3rem;
  > li {
    top: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 2rem;
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

const SearchButton = styled.button`
  width: 7.3%;
  height: 2.3rem;
  background: #47d2d2;
  border-radius: 0.625rem;
  border: none;
  color: #ffffff;
  cursor: pointer;
`;

const SearchResult = styled.div`
  width: 100%;
  min-width: 768px;
  background: #ffffff;
  min-height: 280px;
  margin: 1rem 0;
  padding: 0.5rem 0;
  border-radius: 0.625rem;
`;

interface Props {
  isLastItem: boolean;
  onFetchMorePassengers: () => void;
}

const ClassBoard: NextPage = () => {
  const [slideRef, setSlideRef] = useState(null);
  const [select, setSelect] = useState(0);
  const [favoriteClass, setFavoriteClass] = useState<FavoriteClass[]>([]);
  const univName = useSelector((state: RootState) => state.user.value.univName);
  const { data: session, status } = useSession();

  const [filters, setFilters] = useState<Filter>({ types: [], grades: [], years: [], semesters: [] });
  const [selectedFilters, setSelectedFilters] = useState({
    keyword: "",
    year: null,
    semester: null,
    grade: null,
    type: "",
  });
  const [searchResult, setSearchResult] = useState([]);
  const getFavoriteClass = async () => {
    try {
      const response = await axios.get(API_URL + "lectures/favorites", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      setFavoriteClass(response.data.result);
    } catch (err) {
      alert("수업 데이터 로딩 실패");
    }
  };

  const getFilter = async () => {
    try {
      const response = await axios.get(API_URL + "lectures/filter", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      setFilters(response.data.result);
    } catch (err) {
      alert("검색 필터 로딩 실패");
    }
  };

  useEffect(() => {
    if (session?.user) {
      getFavoriteClass();
      getFilter();
    }
  }, [session]);

  const [isFilterOpen, setIsFilterOpen] = useState({ year: false, semester: false, grade: false, type: false });
  const onFilterOpen = (type) => {
    if (type === "year")
      setIsFilterOpen((prev) => {
        return { ...prev, year: !isFilterOpen[type] };
      });
    else if (type === "semester")
      setIsFilterOpen((prev) => {
        return { ...prev, semester: !isFilterOpen[type] };
      });
    else if (type === "grade")
      setIsFilterOpen((prev) => {
        return { ...prev, grade: !isFilterOpen[type] };
      });
    else if (type === "type")
      setIsFilterOpen((prev) => {
        return { ...prev, type: !isFilterOpen[type] };
      });
  };
  const setFilterValue = (value, type) => {
    selectedFilters[type] = value;
    onFilterOpen(type);
  };
  const onKeywordChange = (e) => {
    setSelectedFilters((prev) => {
      return { ...prev, keyword: e.target.value };
    });
  };
  const getSearchResult = async () => {
    setSearchResult([]);
    const params = {
      keyword: selectedFilters.keyword,
      type: selectedFilters.type,
      grade: selectedFilters.grade,
      year: selectedFilters.year,
      semester: selectedFilters.semester,
      offset: 0,
    };
    try {
      const response = await axios.get(API_URL + "lectures/search", {
        params: params,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      const searchedClass = response.data.result;
      console.log(response.data.result);

      setSearchResult((prev) => [...prev, ...searchedClass]);
    } catch (err) {
      alert("수업 데이터 로딩 실패");
    }
  };
  const [page, setPage] = useState<number>(1);

  return (
    <ClassPage>
      <ClassTitle>{univName}</ClassTitle>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "2% 0 2% 0",
        }}
      >
        <SubTitle>즐겨찾기</SubTitle>
        <SlideButton slideRef={slideRef} select={select} setSelect={setSelect} length={favoriteClass.length} />
      </div>
      <div style={{ height: "18.75rem" }}>
        <Carousel setSlideRef={setSlideRef}>
          {favoriteClass.map((v, i) => (
            <Link href={`/classboard/${v.lectureIdx}?tabnum=0`} key={`favoriteClass-${i}`}>
              <a>
                <ClassBox {...v} select={i === select} />
              </a>
            </Link>
          ))}
        </Carousel>
      </div>
      <ClassSearch>
        <FilterContainer>
          <InputFilter type="text" placeholder="수업명을 검색하세요" onChange={onKeywordChange} />
          <InputSelect>
            <SelectTitle onClick={() => onFilterOpen("year")}>
              {selectedFilters.year ? <span>{selectedFilters.year}</span> : <span>년도</span>}
              {isFilterOpen.year ? <span>▲</span> : <span>▼</span>}
            </SelectTitle>
            {isFilterOpen.year && (
              <SelectOption>
                {filters.years.map((year, idx) => (
                  <li key={`year-${idx}`} value={year} onClick={() => setFilterValue(year, "year")}>
                    <CustomCheck fill="#aaaaaa" />
                    {year}
                  </li>
                ))}
              </SelectOption>
            )}
          </InputSelect>
          <InputSelect>
            <SelectTitle onClick={() => onFilterOpen("semester")}>
              {selectedFilters.semester ? <span>{selectedFilters.semester}학기</span> : <span>학기</span>}
              {isFilterOpen.semester ? <span>▲</span> : <span>▼</span>}
            </SelectTitle>
            {isFilterOpen.semester && (
              <SelectOption>
                {filters.semesters.map((semester, idx) => (
                  <li key={`semester-${idx}`} value={semester} onClick={() => setFilterValue(semester, "semester")}>
                    <CustomCheck fill="#aaaaaa" />
                    {semester}학기
                  </li>
                ))}
              </SelectOption>
            )}
          </InputSelect>
          <InputSelect>
            <SelectTitle onClick={() => onFilterOpen("grade")}>
              {selectedFilters.grade ? <span>{selectedFilters.grade}학년</span> : <span>학년</span>}
              {isFilterOpen.grade ? <span>▲</span> : <span>▼</span>}
            </SelectTitle>
            {isFilterOpen.grade && (
              <SelectOption>
                {filters.grades.map((grade, idx) => (
                  <li key={`grade-${idx}`} value={grade} onClick={() => setFilterValue(grade, "grade")}>
                    <CustomCheck fill="#aaaaaa" />
                    {grade}
                  </li>
                ))}
              </SelectOption>
            )}
          </InputSelect>
          <InputSelect>
            <SelectTitle onClick={() => onFilterOpen("type")}>
              {selectedFilters.type !== "" ? <span>{selectedFilters.type}</span> : <span>구분</span>}
              {isFilterOpen.type ? <span>▲</span> : <span>▼</span>}
            </SelectTitle>
            {isFilterOpen.type && (
              <SelectOption>
                {filters.types.map((type, idx) => (
                  <li key={`type-${idx}`} value={type} onClick={() => setFilterValue(type, "type")}>
                    <CustomCheck fill="#aaaaaa" />
                    {type}
                  </li>
                ))}
              </SelectOption>
            )}
          </InputSelect>
          <SearchButton onClick={getSearchResult}>검색</SearchButton>
        </FilterContainer>
      </ClassSearch>
      <SearchResult>
        {searchResult.map((v, idx) => (
          <Link href={`/classboard/${v.lectureIdx}?tabnum=0`} key={v.lectureIdx}>
            <a>
              <ResultRow
                {...v}
                isLastItem={searchResult.length - 1 === idx}
                filter={selectedFilters}
                setSearchResult={setSearchResult}
                setPage={() => setPage((prev) => prev + 1)}
                page={page}
              />
            </a>
          </Link>
        ))}
      </SearchResult>
    </ClassPage>
  );
};

export default ClassBoard;

// credit: 2
// department: null
// favorite: 0
// grade: 0
// instructor: "도선재"
// lectureIdx: 1615
// name: "ACT"
// semester: 1
// time: "월5,6"
// type: "교양"
// year: 2022
