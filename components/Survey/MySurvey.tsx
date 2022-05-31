import { useMemo, useState } from "react";
import styled from "@emotion/styled";

import TableComponent from "../Table/Table";

const Container = styled.div`
  width: 100%;
  height: 80%;
  background-color: #ffffff;
`;

const MySurvey = () => {
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
    { class: "survey", id: "survey-125345", name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { class: "survey", id: "survey-1234215", name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { class: "survey", id: "survey-1234445", name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { class: "survey", id: "survey-1254345", name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { class: "survey", id: "survey-1236545", name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { class: "survey", id: "survey-12365445", name: "abc", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { class: "survey", id: "survey-1234845", name: "abcd", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
    { class: "survey", id: "survey-1237845", name: "abcde", email: "dfs@dfsfdsf.com", phone: "000-0000-0000" },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <TableComponent columns={columns} data={data} handleInputOpen={handleModalOpen} />
      {isOpen && <></>}
    </Container>
  );
};

export default MySurvey;
