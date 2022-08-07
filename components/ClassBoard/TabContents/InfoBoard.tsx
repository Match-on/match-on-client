import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../../api/API";
import UploadModal from "../components/Modal/UploadModal";
import PostResultRow from "../components/PostResultRow";

interface Post {
  lecturePostIdx: number;
  title: string;
  body: string;
  createdAt: string;
  writer: string;
  profileUrl: string | null;
  hitCount: string;
  commentCount: string;
  cursor: string;
}

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
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2%;
  .right-section {
    width: 15%;
    height: 58%;
    min-width: 160px;
    display: flex;
    justify-content: space-between;
    .button {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
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
  margin-top: 4%;
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

const Table = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const InfoBoard = ({ lectureIdx }) => {
  const { data: session, status } = useSession();

  const [postList, setPostList] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("latest");
  const [keyword, setKeyword] = useState<string>("");
  const [params, setParams] = useState({ type: "info", sort: "latest", keyword: "", cursor: null });

  const handleModalOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const returnIcon = () => {
    return <span style={{ color: "#47d2d2" }}>{filterOpen ? "▲" : "▼"}</span>;
  };

  const setFilterValue = (value) => {
    setFilter(value);
    setFilterOpen(false);
  };

  const getPostList = async () => {
    try {
      const params = { type: "info", sort: filter, keyword: keyword, cursor: null };

      const response = await axios.get(API_URL + `lectures/${lectureIdx}/posts`, {
        params: params,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      const list = response.data.result;
      // setPostList((prev) => [...prev, ...list]);
      setPostList(list);
      console.log("postlist", response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPostList();
  }, [session, isOpen, filter]);
  return (
    <Container>
      <TopSection>
        <InputFilter
          type="text"
          placeholder="수업명을 검색하세요"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              getPostList();
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
            글쓰기
          </div>
        </div>
      </TopSection>
      <Table>
        {postList.map((post, idx) => (
          <Link href={`/classboard/${lectureIdx}/${post.lecturePostIdx}?tabnum=1&type=info`} key={post.lecturePostIdx}>
            <a>
              <PostResultRow
                {...post}
                lectureIdx={lectureIdx}
                setPostList={setPostList}
                isLastItem={postList.length - 1 === idx}
                params={params}
                setParams={() => setParams({ ...params, cursor: postList[postList.length - 1].cursor })}
              />
            </a>
          </Link>
        ))}
      </Table>
      {isOpen && <UploadModal isOpen={isOpen} handleOpen={handleModalOpen} lectureIdx={lectureIdx} type="info" />}
    </Container>
  );
};

export default InfoBoard;

// body: "<p></p>\n"
// commentCount: "0"
// createdAt: "2022-08-01T14:37:31.894Z"
// cursor: "165936465200000001"
// hitCount: "0"
// lecturePostIdx: 1
// profileUrl: null
// title: "d"
// writer: "익명"
