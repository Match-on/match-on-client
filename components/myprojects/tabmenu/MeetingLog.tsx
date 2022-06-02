import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import TableComponent from "../../sub/Table/Table";
import MeetingInputModal from "./TabContents/Input/MeetingInputModal";

const Container = styled.div`
  width: 100%;
  height: 80%;
  background-color: #ffffff;
`;

const MeetingLog = () => {
  const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "Name",
      },
      {
        accessor: "email",
        Header: "Email",
      },
      {
        accessor: "phone",
        Header: "Phone",
      },
    ],
    []
  );

  const data = [
    { class: "meeting", id: "meeting-125345", name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { class: "meeting", id: "meeting-1234215", name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { class: "meeting", id: "meeting-1234445", name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { class: "meeting", id: "meeting-1254345", name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { class: "meeting", id: "meeting-1236545", name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { class: "meeting", id: "meeting-12365445", name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { class: "meeting", id: "meeting-1234845", name: "abcd", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { class: "meeting", id: "meeting-1237845", name: "abcde", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <TableComponent columns={columns} data={data} handleInputOpen={handleModalOpen} upload="업로드" />
      {isOpen && <MeetingInputModal isOpen={isOpen} handleOpen={handleModalOpen} />}
    </Container>
  );
};

export default MeetingLog;
