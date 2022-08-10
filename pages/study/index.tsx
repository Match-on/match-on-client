import styled from "@emotion/styled";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../components/api/API";
import { ClassBox, StudyBox } from "../../components/myprojects/components/BoxContainer";
import Carousel, { SlideButton } from "../../components/sub/Carousel";
import { RootState } from "../../src/redux/store";
import CustomCheck from "../../public/componentSVG/register/CustomCheck.svg";

import ResultRow from "../../components/ClassBoard/components/ResultRow";
interface FavortieStudy {
  studyIdx: number;
  title: string;
  category: string;
  region: string;
  count: number;
  hitCount: string;
  commentCount: string;
}

interface Category {
  categoryIdx: number;
  category: string;
}

interface Region {
  regionIdx: number;
  region: string;
}

interface Filter {
  categories: Category[];
  regions: Region[];
}

interface Study {
  studyIdx: number;
  title: string;
  body: string;
  region: string;
  category: string;
  count: number;
  hitCount: string;
  commentCount: string;
  cursor: string;
}

const StudyPage = styled.div`
  width: calc(100% - 8%);
  margin-left: 4%;
`;

const StudyTitle = styled.div`
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

const ClassSearch = styled.div<{ scroll: boolean }>`
  width: 100%;
  margin-top: ${(props) => (props.scroll ? "2.5rem" : "5%")};
  position: ${(props) => (props.scroll ? "fixed" : "relative")};
  top: ${(props) => (props.scroll ? "0" : "0")};
`;

const FilterContainer = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: #ffffff;
  .upper {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
`; //1367

const InputFilter = styled.input`
  width: 55%;
  height: 2.3rem;
  border-radius: 0.625rem;
  padding-left: 1%;
  border: none;
  background: #f2f6f6;
  color: #ababab;
  &:focus {
    outline: none;
  }
  ::-webkit-input-placeholder {
    margin-left: 20px;
  }
`;

const InputSelect = styled.div`
  width: 9rem;
  color: #ababab;
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
  justify-content: space-evenly;
  align-items: center;
  font-size: 0.75rem;
  background: #ffffff;
  padding: 0 10%;
  .selected {
    color: #50d5d5;
  }
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

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
`;
const Category = styled.div<{ selected: boolean }>`
  height: 1.25rem;
  margin-right: 1rem;
  font-size: 0.75rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.selected ? "#f2f6f6" : "#ffffff")};
  color: ${(props) => (props.selected ? "#47d2d2" : "#000000")};
  border-radius: 3rem;
  &:hover {
    background-color: #f2f6f6;
    color: #47d2d2;
  }
`;

interface Props {
  isLastItem: boolean;
  onFetchMorePassengers: () => void;
}

const Study: NextPage = () => {
  const [slideRef, setSlideRef] = useState(null);
  const [select, setSelect] = useState(0);
  const [favoriteStudy, setFavoriteStudy] = useState<FavortieStudy[]>([]);
  const { data: session, status } = useSession();

  const [filters, setFilters] = useState<Filter>({ categories: [], regions: [] });
  const [selectedFilters, setSelectedFilters] = useState({
    keyword: "",
    category: [{ name: "", idx: null }],
    region: { name: "", idx: null },
    sort: "latest",
    cursor: "",
  });
  const [searchResult, setSearchResult] = useState<Study[]>([]);

  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    if (document.getElementById("main").scrollTop >= 350) {
      setScroll(true);
    } else {
      // 스크롤이 50px 미만일경우 false를 넣어줌
      setScroll(false);
    }
  };
  useEffect(() => {
    document.getElementById("main").addEventListener("scroll", handleScroll);
    return () => {
      document.getElementById("main").removeEventListener("scroll", handleScroll); //clean up
    };
  });

  const getFavoriteStudy = async () => {
    try {
      const response = await axios.get(API_URL + "studies/favorites", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      console.log("favorite", response.data.result);
    } catch (err) {
      alert("수업 데이터 로딩 실패");
    }
  };

  const getFilter = async () => {
    try {
      const response = await axios.get(API_URL + "studies/filter", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      console.log("filter", response.data.result);

      setFilters(response.data.result);
    } catch (err) {
      alert("검색 필터 로딩 실패");
    }
  };

  useEffect(() => {
    if (session?.user) {
      getFavoriteStudy();
      getFilter();
    }
  }, [session]);

  const onKeywordChange = (e) => {
    setSelectedFilters((prev) => {
      return { ...prev, keyword: e.target.value };
    });
  };

  const [isFilterOpen, setIsFilterOpen] = useState({ region: false, sort: false });
  const onFilterOpen = (type) => {
    if (type === "region")
      setIsFilterOpen((prev) => {
        return { ...prev, region: !isFilterOpen[type] };
      });
    if (type === "sort")
      setIsFilterOpen((prev) => {
        return { ...prev, sort: !isFilterOpen[type] };
      });
  };
  const setFilterValue = (name, idx, type) => {
    if (type !== "sort") {
      selectedFilters[type].name = name;
      selectedFilters[type].idx = idx;
    } else {
      selectedFilters[type] = name;
    }
    onFilterOpen(type);
  };
  const setCategory = (name, idx) => {
    if (selectedFilters.category.some((category) => category.idx === idx)) {
      setSelectedFilters((prev) => {
        return { ...prev, category: [...selectedFilters.category.filter((category) => category.idx !== idx)] };
      });
    } else {
      setSelectedFilters((prev) => {
        return { ...prev, category: [...selectedFilters.category.concat({ name: name, idx: idx })] };
      });
    }
  };
  // const getSearchResult = async () => {
  //   setSearchResult([]);
  //   const params = {
  //     sort: selectedFilters.keyword,
  //     cursor: selectedFilters.cursor,
  //     keyword: selectedFilters.keyword,
  //     regionIdx: selectedFilters.region,
  //     catetoryIdx: selectedFilters.category,
  //   };
  //   try {
  //     const response = await axios.get(API_URL + "studies", {
  //       params: params,
  //       headers: {
  //         Authorization: `Bearer ${session.accessToken}`,
  //       },
  //     });
  //     const searchedClass = response.data.result;
  //     setSearchResult((prev) => [...prev, ...searchedClass]);
  //   } catch (err) {
  //     alert("수업 데이터 로딩 실패");
  //   }
  // };
  const [page, setPage] = useState<number>(1);

  return (
    <StudyPage>
      <StudyTitle>스터디</StudyTitle>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "2% 0 2% 0",
        }}
      >
        <SubTitle>즐겨찾기</SubTitle>
        <SlideButton slideRef={slideRef} select={select} setSelect={setSelect} length={favoriteStudy.length} />
      </div>
      {/* <div style={{ height: "18.75rem" }}>
        <Carousel setSlideRef={setSlideRef}>
          {favoriteStudy.map((v, i) => (
            <Link href={`/classboard/${v.lectureIdx}?`} key={`favoriteStudy-${i}`}>
              <a>
                <StudyBox {...v} select={i === select} />
              </a>
            </Link>
          ))}
        </Carousel>
      </div> */}
      <ClassSearch scroll={scroll} id="class_search">
        <FilterContainer>
          <div className="upper">
            <InputFilter type="text" placeholder="검색" onChange={onKeywordChange} />
            <InputSelect>
              <SelectTitle onClick={() => onFilterOpen("region")}>
                <span>지역 선택</span>
                <div>
                  {selectedFilters.region.idx ? (
                    <span className="selected">{selectedFilters.region.name}</span>
                  ) : (
                    <span></span>
                  )}
                  {isFilterOpen.region ? <span className="selected">▲</span> : <span className="selected">▼</span>}
                </div>
              </SelectTitle>
              {isFilterOpen.region && (
                <SelectOption>
                  {filters.regions.map((region, idx) => (
                    <li
                      key={`region-${idx}`}
                      value={region.regionIdx}
                      onClick={() => setFilterValue(region.region, region.regionIdx, "region")}
                    >
                      <CustomCheck fill="#aaaaaa" />
                      {region.region}
                    </li>
                  ))}
                </SelectOption>
              )}
            </InputSelect>
            <InputSelect>
              <SelectTitle onClick={() => onFilterOpen("sort")}>
                <span>분류</span>
                <div>
                  {selectedFilters.sort === "latest" ? (
                    <span className="selected">최신순</span>
                  ) : (
                    <span className="selected">인기순</span>
                  )}
                  {isFilterOpen.sort ? <span className="selected">▲</span> : <span className="selected">▼</span>}
                </div>
              </SelectTitle>
              {isFilterOpen.sort && (
                <SelectOption>
                  <li value={"latest"} onClick={() => setFilterValue("latest", null, "sort")}>
                    <CustomCheck fill="#aaaaaa" />
                    최신순
                  </li>
                  <li value={"popular"} onClick={() => setFilterValue("popular", null, "sort")}>
                    <CustomCheck fill="#aaaaaa" />
                    인기순
                  </li>
                </SelectOption>
              )}
            </InputSelect>
            <SearchButton>글쓰기</SearchButton>
          </div>
          <CategoryContainer>
            {filters.categories.map((v, idx) => (
              <Category
                onClick={() => setCategory(v.category, v.categoryIdx)}
                selected={selectedFilters.category.some((category) => category.idx === v.categoryIdx)}
                key={idx}
              >
                {v.category}
              </Category>
            ))}
          </CategoryContainer>
        </FilterContainer>
      </ClassSearch>
      <SearchResult>
        {/* {searchResult.map((v, idx) => (
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
        ))} */}
      </SearchResult>
    </StudyPage>
  );
};

export default Study;

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
