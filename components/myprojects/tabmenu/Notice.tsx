import React, { useMemo } from "react";
import styled from "@emotion/styled";
import TableComponent from "../../Table/Table";

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
    { title: "프로젝트 이름", author: "조성훈", date: "2022-05-30" },
    { title: "다음 회의 가능 날짜", author: "조성훈", date: "2022-05-01" },
    { title: "프로젝트 이름", author: "조성훈", date: "2022-05-30" },
    { title: "다음 회의 가능 날짜", author: "조성훈", date: "2022-05-01" },
    { title: "프로젝트 이름", author: "조성훈", date: "2022-05-30" },
    { title: "다음 회의 가능 날짜", author: "조성훈", date: "2022-05-01" },
    { title: "프로젝트 이름", author: "조성훈", date: "2022-05-30" },
    { title: "다음 회의 가능 날짜", author: "조성훈", date: "2022-05-01" },
    { title: "프로젝트 이름", author: "조성훈", date: "2022-05-30" },
    { title: "다음 회의 가능 날짜", author: "조성훈", date: "2022-05-01" },
  ];
  return (
    <Container>
      <TableComponent columns={columns} data={data} />
    </Container>
  );
};

export default Notice;
