import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../../api/API";
import ClassTable from "../components/ClassTable";
import UploadModal from "../components/Modal/UploadModal";

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
  height: 83%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
`;

const FreeBoard = ({ lectureIdx }) => {
  const columns = useMemo(
    () => [
      {
        accessor: "contents",
        Header: "Contents",
      },
      {
        accessor: "date",
        Header: "Date",
      },
      {
        accessor: "seen",
        noHeader: "Seen",
      },
      {
        accessor: "comments",
        noHeader: "Comments",
      },
    ],
    []
  );
  const { data: session, status } = useSession();

  const [postList, setPostList] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  const getPostList = async () => {
    const params = {
      type: "free",
      sort: "latest",
    };
    try {
      const response = await axios.get(API_URL + `lectures/${lectureIdx}/posts`, {
        params: params,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      setPostList(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPostList();
  }, []);
  return (
    <Container>
      <ClassTable columns={columns} data={postList} handleInputOpen={handleModalOpen} lectureIdx={lectureIdx} />
      {isOpen && <UploadModal isOpen={isOpen} handleOpen={handleModalOpen} />}
    </Container>
  );
};

export default FreeBoard;
