import styled from "@emotion/styled";
import { useMemo, useState } from "react";
import ClassTable from "../components/ClassTable";

const Container = styled.div`
  width: 100%;
  height: 83%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
`;

const FreeBoard = () => {
  const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "contents",
        Header: "Contents",
      },
      {
        accessor: "date",
        comments: "Date",
      },
      {
        accessor: "seen",
        comments: "Seen",
      },
      {
        accessor: "comments",
        comments: "Comments",
      },
    ],
    []
  );
  const data = [
    {
      class: "freeboard",
      id: "freeboard-125345",
      name: "abc",
      contents: "안녕하세요ㅇㅇㅇㅇㅇㅇㅇ",
      date: "2022-06-01",
      seen: 15,
      comments: 3,
    },
    {
      class: "freeboard",
      id: "freeboard-1234215",
      name: "abc",
      contents: "안녕하세요ㅇㅇㅇㅇㅇㅇㅇ",
      date: "2022-06-01",
      seen: 15,
      comments: 3,
    },
    {
      class: "freeboard",
      id: "freeboard-1234445",
      name: "abc",
      contents: "안녕하세요ㅇㅇㅇㅇㅇㅇㅇ",
      date: "2022-06-01",
      seen: 15,
      comments: 3,
    },
    {
      class: "freeboard",
      id: "freeboard-1254345",
      name: "abc",
      contents: "안녕하세요ㅇㅇㅇㅇㅇㅇㅇ",
      date: "2022-06-01",
      seen: 15,
      comments: 3,
    },
    {
      class: "freeboard",
      id: "freeboard-1236545",
      name: "abc",
      contents: "안녕하세요ㅇㅇㅇㅇㅇㅇㅇ",
      date: "2022-06-01",
      seen: 15,
      comments: 3,
    },
    {
      class: "freeboard",
      id: "freeboard-12365445",
      name: "abc",
      contents: "안녕하세요ㅇㅇㅇㅇㅇㅇㅇ",
      date: "2022-06-01",
      seen: 15,
      comments: 3,
    },
    {
      class: "freeboard",
      id: "freeboard-1234845",
      name: "abcd",
      contents: "안녕하세요ㅇㅇㅇㅇㅇㅇㅇ",
      date: "2022-06-01",
      seen: 15,
      comments: 3,
    },
    {
      class: "freeboard",
      id: "freeboard-1237845",
      name: "abcde",
      contents: "안녕하세요ㅇㅇㅇㅇㅇㅇㅇ",
      date: "2022-06-01",
      seen: 15,
      comments: 3,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <ClassTable columns={columns} data={data} handleInputOpen={handleModalOpen} upload="업로드" />
      {/* {isOpen && <MeetingInputModal isOpen={isOpen} handleOpen={handleModalOpen} />} */}
    </Container>
  );
};

export default FreeBoard;
