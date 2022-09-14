import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import TableComponent from "../../sub/Table/Table";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

const Notice = () => {
  const columns = useMemo(
    () => [
      {
        accessor: "title",
        Header: "Title",
      },
      {
        accessor: "author",
        Header: "Author",
      },
      {
        accessor: "date",
        Header: "Date",
      },
    ],
    []
  );

  const data = [
    {
      class: "notice",
      id: "notice-122345",
      title: "프로젝트 이름",
      author: "조성훈",
      date: "2022-05-30",
    },
    {
      class: "notice",
      id: "notice-1235445",
      title: "다음 회의 가능 날짜",
      author: "조성훈",
      date: "2022-05-01",
    },
    {
      class: "notice",
      id: "notice-12345",
      title: "프로젝트 이름",
      author: "조성훈",
      date: "2022-05-30",
    },
    {
      class: "notice",
      id: "notice-123445",
      title: "다음 회의 가능 날짜",
      author: "조성훈",
      date: "2022-05-01",
    },
    {
      class: "notice",
      id: "notice-12345",
      title: "프로젝트 이름",
      author: "조성훈",
      date: "2022-05-30",
    },
    {
      class: "notice",
      id: "notice-123245",
      title: "다음 회의 가능 날짜",
      author: "조성훈",
      date: "2022-05-01",
    },
    {
      class: "notice",
      id: "notice-123545",
      title: "프로젝트 이름",
      author: "조성훈",
      date: "2022-05-30",
    },
    {
      class: "notice",
      id: "notice-129345",
      title: "다음 회의 가능 날짜",
      author: "조성훈",
      date: "2022-05-01",
    },
    {
      class: "notice",
      id: "notice-124345",
      title: "프로젝트 이름",
      author: "조성훈",
      date: "2022-05-30",
    },
    {
      class: "notice",
      id: "notice-123545",
      title: "다음 회의 가능 날짜",
      author: "조성훈",
      date: "2022-05-01",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <TableComponent
        columns={columns}
        data={data}
        handleInputOpen={handleModalOpen}
        upload="업로드"
      />
    </Container>
  );
};

export default Notice;
