import styled from "@emotion/styled";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../components/api/API";
import { StudyBox } from "../../components/myprojects/components/BoxContainer";
import Carousel, { SlideButton } from "../../components/sub/Carousel";
import CustomCheck from "../../public/componentSVG/register/CustomCheck.svg";
import qs from "qs";
import UploadModal from "../../components/Study/Modal/UploadModal";
import ResultRow from "../../components/Study/table/ResultRow";
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

const StudySearch = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FilterContainer = styled.div<{ scroll: boolean }>`
  width: ${(props) => (props.scroll ? "calc(90% - 5rem)" : "100%")};
  min-width: 768px;
  height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: #ffffff;
  border-radius: 0.625rem 0.625rem 0 0;
  margin-top: ${(props) => (props.scroll ? "2.5rem" : "5%")};
  position: ${(props) => (props.scroll ? "fixed" : "relative")};
  top: ${(props) => (props.scroll ? "0" : "0")};
  left: ${(props) => (props.scroll ? "5rem + 2%" : "0")};

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
`;

const OptionList = styled.li<{ selected: boolean }>`
  top: 3rem;
  display: flex;
  align-items: center;
  width: 4rem;
  justify-content: space-between;
  height: 2rem;
  font-size: 0.75rem;
  padding: 5%;
  color: ${(props) => (props.selected ? "#47d2d2" : "#aaaaaa")};
  > svg {
    fill: ${(props) => (props.selected ? "#47d2d2" : "#aaaaaa")};
  }
  cursor: pointer;
  &:hover {
    color: #47d2d2;
    > svg {
      fill: #47d2d2;
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
  padding: 0.5rem 0;
  border-radius: 0 0 0.625rem 0.625rem;
  border-top: 0.5px solid #dcdcdc;
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
  cursor: pointer;
  &:hover {
    background-color: #f2f6f6;
    color: #47d2d2;
  }
`;

const Study: NextPage = () => {
  const { data: session, status } = useSession();
  const [slideRef, setSlideRef] = useState(null);
  const [select, setSelect] = useState(0);

  const [favoriteStudy, setFavoriteStudy] = useState<FavortieStudy[]>([]);

  const [filters, setFilters] = useState<Filter>({ categories: [], regions: [] });

  const [keyword, setKeyword] = useState<string>("");
  const [sort, setSort] = useState<string>("latest");
  const [region, setRegion] = useState<Region[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [cursor, setCursor] = useState<string>("0");

  const [searchResult, setSearchResult] = useState<Study[]>([]);

  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    if (document.getElementById("main").scrollTop >= 450) {
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
      console.log(response.data.result);
      setFavoriteStudy(response.data.result);
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
    setKeyword(e.target.value);
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
  const setSortValue = (value) => {
    setSort(value);
    onFilterOpen("sort");
  };
  // 한 번 더 클릭하면 해제 하는 기능
  const setRegionValue = (name, idx) => {
    if (region.some((x) => x.regionIdx === idx)) {
      setRegion(region.filter((region) => region.regionIdx !== idx));
    } else {
      setRegion([...region, { regionIdx: idx, region: name }]);
    }
    onFilterOpen("region");
  };
  const setCategoryValue = (name, idx) => {
    if (category.some((x) => x.categoryIdx === idx)) {
      setCategory(category.filter((category) => category.categoryIdx !== idx));
    } else {
      setCategory([...category, { categoryIdx: idx, category: name }]);
    }
  };
  const getSearchResult = async () => {
    const params = {
      sort: sort,
      cursor: cursor,
      keyword: keyword,
      regionIdx: region.map((v, i) => v.regionIdx),
      categoryIdx: category.map((v, i) => v.categoryIdx),
    };
    try {
      const response = await axios.get(API_URL + "studies", {
        params: params,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      setSearchResult((prev) => [...prev, ...response.data.result]);
    } catch (err) {
      console.log(err);
      alert("수업 데이터 로딩 실패");
    }
  };
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => {
    setModalOpen((prev) => !prev);
  };
  useEffect(() => {
    if (cursor === null) getSearchResult();
  }, [cursor]);
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
      <div style={{ height: "18.75rem" }}>
        <Carousel setSlideRef={setSlideRef}>
          {favoriteStudy.map((v, i) => (
            <Link href={`/study/${v.studyIdx}?`} key={`favoriteStudy-${i}`}>
              <a>
                <StudyBox {...v} select={i === select} />
              </a>
            </Link>
          ))}
        </Carousel>
      </div>
      <StudySearch id="class_search">
        <FilterContainer scroll={scroll}>
          <div className="upper">
            <InputFilter type="text" placeholder="검색" onChange={onKeywordChange} />
            <InputSelect>
              <SelectTitle onClick={() => onFilterOpen("region")}>
                <span>지역 선택</span>
                <div>
                  {region.length ? (
                    <span className="selected">
                      {region[0].region}
                      {region.length > 1 && `+${region.length - 1}`}
                    </span>
                  ) : (
                    <span></span>
                  )}
                  {isFilterOpen.region ? <span className="selected">▲</span> : <span className="selected">▼</span>}
                </div>
              </SelectTitle>
              {isFilterOpen.region && (
                <SelectOption>
                  {filters.regions.map((v, idx) => (
                    <OptionList
                      onClick={() => setRegionValue(v.region, v.regionIdx)}
                      key={`region-${idx}`}
                      value={v.regionIdx}
                      selected={region.some((region) => region.regionIdx === v.regionIdx)}
                    >
                      <CustomCheck fill="#aaaaaa" />
                      {v.region}
                    </OptionList>
                  ))}
                </SelectOption>
              )}
            </InputSelect>
            <InputSelect>
              <SelectTitle onClick={() => onFilterOpen("sort")}>
                <span>분류</span>
                <div>
                  {sort === "latest" ? (
                    <span className="selected">최신순</span>
                  ) : (
                    <span className="selected">인기순</span>
                  )}
                  {isFilterOpen.sort ? <span className="selected">▲</span> : <span className="selected">▼</span>}
                </div>
              </SelectTitle>
              {isFilterOpen.sort && (
                <SelectOption>
                  <OptionList value={"latest"} onClick={() => setSortValue("latest")} selected={sort === "latest"}>
                    <CustomCheck fill="#aaaaaa" />
                    최신순
                  </OptionList>
                  <OptionList value={"popular"} onClick={() => setSortValue("popular")} selected={sort === "popular"}>
                    <CustomCheck fill="#aaaaaa" />
                    인기순
                  </OptionList>
                </SelectOption>
              )}
            </InputSelect>
            <SearchButton
              onClick={() => {
                setCursor(null);
                setSearchResult([]);
                if (cursor === null) getSearchResult();
              }}
            >
              검색
            </SearchButton>
            <SearchButton onClick={handleModalOpen}>글쓰기</SearchButton>
          </div>
          <CategoryContainer>
            {filters.categories.map((v, idx) => (
              <Category
                onClick={() => setCategoryValue(v.category, v.categoryIdx)}
                selected={category.some((category) => category.categoryIdx === v.categoryIdx)}
                key={idx}
              >
                {v.category}
              </Category>
            ))}
          </CategoryContainer>
        </FilterContainer>
        <SearchResult>
          {searchResult.map((v, idx) => (
            <Link href={`/study/${v.studyIdx}?tabnum=0`} key={v.studyIdx}>
              <a>
                <ResultRow
                  {...v}
                  isLastItem={searchResult.length - 1 === idx}
                  getSearchResult={getSearchResult}
                  setCursor={() => setCursor(searchResult[searchResult.length - 1].cursor)}
                />
              </a>
            </Link>
          ))}
        </SearchResult>
      </StudySearch>
      {modalOpen && (
        <UploadModal
          isOpen={modalOpen}
          handleOpen={handleModalOpen}
          categoryFilter={filters.categories}
          regionFilter={filters.regions}
        />
      )}
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
