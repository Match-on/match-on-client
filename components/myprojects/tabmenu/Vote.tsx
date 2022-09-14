import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../../api/API";
import { VoteRow } from "../components/PostRow";
import VoteModal from "./tabComponents/Modal/VoteModal";

interface Vote {
  voteIdx: number;
  title: string;
  endTime: string;
  isNew: number;
  count: string;
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

const Vote = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { projectIdx } = router.query;

  const [voteList, setVoteList] = useState<Vote[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("latest");
  const [keyword, setKeyword] = useState<string>("");
  const [params, setParams] = useState({
    type: "free",
    sort: "latest",
    keyword: "",
    cursor: null,
  });

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

  const getVoteList = async () => {
    try {
      const params = { sort: filter, keyword: keyword };

      const response = await axios.get(API_URL + `teams/${projectIdx}/votes`, {
        params: params,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      console.log(response.data.result);

      setVoteList(response.data.result);
      // setPostList((prev) => [...prev, ...list]);
      // setVoteList(list);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVoteList();
    console.log(voteList);
  }, [session, isOpen, filter]);
  return (
    <Container>
      <TopSection>
        <InputFilter type="text" placeholder="검색" />
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
            업로드
          </div>
        </div>
      </TopSection>
      <Table>
        {voteList.map((v, i) => (
          <Link href={`/myproject/${projectIdx}/${v.voteIdx}?tabNum=4`} key={i}>
            <a>
              <VoteRow key={i} {...v} />
            </a>
          </Link>
        ))}
      </Table>
      {isOpen && (
        <VoteModal
          isOpen={isOpen}
          handleOpen={handleModalOpen}
          projectIdx={projectIdx}
        />
      )}
    </Container>
  );
};

export default Vote;
