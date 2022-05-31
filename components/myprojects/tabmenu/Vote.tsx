import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import TableComponent from "../../Table/Table";
import VoteModal from "../../TableContents/Input/VoteInputModal";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

const Vote = () => {
  const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "date",
        Header: "Date",
      },
      {
        accessor: "voted",
        Header: "Voted",
      },
      {
        accessor: "entire",
        Header: "Entire",
      },
    ],
    []
  );

  const data = [
    { class: "vote", id: "vote-12345", name: "프로젝트 이름", date: "2022-05-30", voted: "2", entire: "4" },
    { class: "vote", id: "vote-123456", name: "다음 회의 가능 날짜", date: "2022-05-01", voted: "3", entire: "4" },
    { class: "vote", id: "vote-123451", name: "프로젝트 이름", date: "2022-05-30", voted: "2", entire: "4" },
    { class: "vote", id: "vote-123452", name: "다음 회의 가능 날짜", date: "2022-05-01", voted: "3", entire: "4" },
    { class: "vote", id: "vote-123458", name: "프로젝트 이름", date: "2022-05-30", voted: "2", entire: "4" },
    { class: "vote", id: "vote-123458", name: "다음 회의 가능 날짜", date: "2022-05-01", voted: "3", entire: "4" },
    { class: "vote", id: "vote-12345", name: "프로젝트 이름", date: "2022-05-30", voted: "2", entire: "4" },
    { class: "vote", id: "vote-123454", name: "다음 회의 가능 날짜", date: "2022-05-01", voted: "3", entire: "4" },
    { class: "vote", id: "vote-12345", name: "프로젝트 이름", date: "2022-05-30", voted: "2", entire: "4" },
    { class: "vote", id: "vote-123459", name: "다음 회의 가능 날짜", date: "2022-05-01", voted: "3", entire: "4" },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <TableComponent columns={columns} data={data} handleInputOpen={handleModalOpen} />
      {isOpen && <VoteModal isOpen={isOpen} handleOpen={handleModalOpen} />}
    </Container>
  );
};

export default Vote;
