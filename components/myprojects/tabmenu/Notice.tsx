import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL } from "../../api/API";
import NoteModal from "./tabComponents/Modal/NoteModal";
import { MeetingRow, NoticeRow } from "../components/PostRow";
import NoticeModal from "./tabComponents/Modal/NoticeModal";

interface NoticeProps {
  noticeIdx: number;
  title: string;
  name: string;
  createdAt: string;
  isNew: string;
  commentCount: string;
  files: string[];
}

const Container = styled.div`
  width: 100%;
  height: 100%;
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
  .upload_button {
    width: 6rem;
    height: 2.3rem;
    background-color: #47d2d2;
    border-radius: 10px;
    text-align: center;
    line-height: 2.3rem;
    color: #ffffff;
    cursor: pointer;
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
// : MemberInformation[]
const Notice = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { projectIdx } = router.query;

  const [noticeList, setNoticeList] = useState<NoticeProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState<string>("");

  const handleModalOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const getNoticeList = async () => {
    try {
      const params = { sort: "latest", keyword: keyword };

      const response = await axios.get(
        API_URL + `teams/${projectIdx}/notices`,
        {
          params: params,
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      console.log(response.data.result);
      setNoticeList(response.data.result);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    getNoticeList();
  }, [session, isOpen]);
  return (
    <Container>
      <TopSection>
        <InputFilter type="text" placeholder="검색" />
        <div className="upload_button" onClick={() => setIsOpen(true)}>
          업로드
        </div>
      </TopSection>
      <Table>
        {noticeList.map((notice, idx) => (
          <Link
            href={`/myproject/${projectIdx}/${notice.noticeIdx}?tabNum=5`}
            key={idx}
          >
            <a>
              <NoticeRow {...notice} />
            </a>
          </Link>
        ))}
      </Table>
      {isOpen && (
        <NoticeModal
          isOpen={isOpen}
          handleOpen={handleModalOpen}
          projectIdx={projectIdx}
        />
      )}
    </Container>
  );
};

export default Notice;
