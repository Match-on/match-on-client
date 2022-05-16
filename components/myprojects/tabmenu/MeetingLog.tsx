import React, { useMemo } from "react";
import styled from "@emotion/styled";
import TableComponent from "../../Table/Table";

const Container = styled.div`
  position: absolute;
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
    { name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { name: "abcd", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { name: "abcde", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
  ];
  return (
    <Container>
      <TableComponent columns={columns} data={data} />
    </Container>
  );
};

export default MeetingLog;
