import Modal from "react-modal";
import styled from "@emotion/styled";
//1367 645
import Close from "../../../public/componentSVG/CloseButton.svg";
import EditorForm from "../../sub/Editor";
import axios from "axios";
import { API_URL } from "../../api/API";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import CustomCheck from "../../../public/componentSVG/register/CustomCheck.svg";
import { useAppSelector } from "../../../src/hooks/hooks";
import { RootState } from "../../../src/redux/store";

interface FilterValue {
  name: string;
  idx: number;
}

const customStyles = {
  overlay: {
    width: "60%",
    minWidth: "600px",
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
    justifyContent: "spacebetween",
  },
};

const StyledModal = styled(Modal)`
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  .bottom {
    display: flex;
    margin-left: calc(100% - 11.5rem);
  }
  padding: 5%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 5%;
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
  height: 50%;
`;
const TagWrapper = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
`;

const Tag = styled.div<{ background: string }>`
  min-width: 4rem;
  height: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 300;
  border-radius: 1rem;
  background: ${(props) => props.background};
`;

const CategoryWrapper = styled.div`
  width: 100%;
  height: 6.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .title {
    font-size: 1rem;
    color: #000000;
  }
  .subtitle {
    font-size: 0.8rem;
    color: #ababab;
    margin-right: 1rem;
  }
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CheckBox = styled.div<{ checked: boolean }>`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  padding: 2px;
  margin-right: 0.5rem;
  background-clip: content-box;
  border: ${(props) => (props.checked ? "3px solid #47d2d2" : "3px solid #ababab")};
  background-color: ${(props) => (props.checked ? "#47d2d2" : "#ffffff")};
  cursor: pointer;
`;

const RangeWrapper = styled.div`
  width: 80%;
  min-width: 450px;
  display: flex;
  justify-content: space-between;
`;

const InputRange = styled.input`
  width: 80%;
  /* background-color: #d3d3d3; */
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
  height: 2.5rem;
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

const SelectTitle = styled.div`
  width: 6rem;
  height: 2.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #ababab;
  background: #ffffff;
  border-radius: 0.625rem;
  cursor: pointer;
`;

const SelectOption = styled.ul`
  position: absolute;
  width: 6rem;
  border-radius: 0.625rem;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  z-index: 1;
  > li {
    display: flex;
    align-items: center;
    height: 2rem;
    font-size: 0.75rem;
    padding: 5%;
    z-index: 1;
    cursor: pointer;
    &:hover {
      color: #47d2d2;
      > svg {
        fill: #47d2d2;
      }
    }
  }
`;

const UploadModal = ({ isOpen, handleOpen, categoryFilter, regionFilter }) => {
  const { data: session, status } = useSession();

  const userUniv = useAppSelector((state: RootState) => state.user.value.univName);

  const [isFilterOpen, setIsFilterOpen] = useState({ category: false, region: false });

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const [target, setTarget] = useState<number>(0);
  const [category, setCategory] = useState<FilterValue>(null);
  const [region, setRegion] = useState<FilterValue>(null);
  const [count, setCount] = useState<number>(1);

  const onFilterOpen = (type) => {
    if (type === "category") {
      setIsFilterOpen(() => {
        return { region: false, category: !isFilterOpen[type] };
      });
    }
    if (type === "region")
      setIsFilterOpen(() => {
        return { category: false, region: !isFilterOpen[type] };
      });
  };
  const setFilterValue = (name, idx, type) => {
    if (type === "category") {
      setCategory({ name: name, idx: idx });
    }
    if (type === "region") {
      setRegion({ name: name, idx: idx });
    }
    onFilterOpen(type);
  };

  const postStudy = async () => {
    try {
      const res = await axios.post(
        API_URL + `studies`,
        { target: target, category: category.idx, region: region.idx, title: title, body: body, count: count },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      console.log(res);

      handleOpen();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(target);
    console.log(category);
    console.log(region);
    console.log(title);
    console.log(body);
    console.log(count);
  }, [category]);
  return (
    <StyledModal isOpen={isOpen} onRequesClose={handleOpen} ariaHideApp={false} style={customStyles}>
      <Header>
        <Title>스터디그룹 모집 글 작성</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <TagWrapper>
        <Tag background="#47d2d2">모집중</Tag>
        {category && <Tag background="#c4c4c4">{category.name}</Tag>}{" "}
        {region && <Tag background="#c4c4c4">{region.name}</Tag>}
      </TagWrapper>
      <CategoryWrapper>
        <div className="title">모집대상</div>
        <CheckBoxWrapper>
          <CheckBox checked={target === 0} onClick={() => setTarget(0)}></CheckBox>
          <div className="subtitle">전체</div>
          {userUniv !== null && (
            <>
              <CheckBox checked={target === 1} onClick={() => setTarget(1)}></CheckBox>
              <div className="subtitle">{userUniv} 재학생</div>
            </>
          )}
        </CheckBoxWrapper>
      </CategoryWrapper>
      <CategoryWrapper>
        <div className="title">분야</div>
        <SelectTitle onClick={() => onFilterOpen("category")}>
          {category ? <span>{category.name}</span> : <span>분야 선택</span>}
          {isFilterOpen.category ? <span>△</span> : <span>▽</span>}
        </SelectTitle>
        {isFilterOpen.category && (
          <SelectOption>
            {categoryFilter.map((category, idx) => (
              <li
                key={`category-${idx}`}
                value={category.category}
                onClick={() => setFilterValue(category.category, category.categoryIdx, "category")}
              >
                <CustomCheck fill="#aaaaaa" />
                {category.category}
              </li>
            ))}
          </SelectOption>
        )}
      </CategoryWrapper>
      <CategoryWrapper>
        <div className="title">지역</div>
        <SelectTitle onClick={() => onFilterOpen("region")}>
          {region ? <span>{region.name}</span> : <span>지역 선택</span>}
          {isFilterOpen.region ? <span>△</span> : <span>▽</span>}
        </SelectTitle>
        {isFilterOpen.region && (
          <SelectOption>
            {regionFilter.map((region, idx) => (
              <li
                key={`region-${idx}`}
                value={region.region}
                onClick={() => setFilterValue(region.region, region.regionIdx, "region")}
              >
                <CustomCheck fill="#aaaaaa" />
                {region.region}
              </li>
            ))}
          </SelectOption>
        )}
      </CategoryWrapper>
      <CategoryWrapper>
        <div className="title">모집인원</div>
        <RangeWrapper>
          <div>{count}명</div>
          <InputRange
            type="range"
            value={count}
            min={1}
            max={10}
            onChange={(e) => setCount(parseInt(e.target.value))}
          />
          <div style={{ color: "#c4c4c4" }}>10명</div>
        </RangeWrapper>
      </CategoryWrapper>
      <Contents>
        <ContentInput placeholder="제목" onChange={(e) => setTitle(e.target.value)} />
        <EditorForm setBody={setBody} data="" clickable={isFilterOpen.category || isFilterOpen.region} />
      </Contents>
      <ButtonWrapper>
        <UploadButton
          onClick={title.length !== 0 && body.length !== 8 ? postStudy : undefined}
          possible={title.length !== 0 && body.length > 7}
        >
          완료
        </UploadButton>
      </ButtonWrapper>
    </StyledModal>
  );
};

export default UploadModal;
