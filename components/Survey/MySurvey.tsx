import { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";

import TableComponent from "../sub/Table/Table";

import NewSurvey from "../../public/componentSVG/survey/newSurvey.svg";
import OldSurvey from "../../public/componentSVG/survey/oldSurvey.svg";

const Container = styled.div`
  width: 100%;
  height: 80%;
  background-color: #ffffff;
`;

const MySurvey = () => {
  const columns = useMemo(
    () => [
      {
        accessor: "newicon",
        Header: "NewIcon",
      },
      {
        accessor: "title",
        Header: "Title",
      },
      {
        accessor: "date",
        Header: "Date",
      },
      {
        accessor: "seen",
        Header: "Seen",
      },
      {
        accessor: "comments",
        Header: "Comments",
      },
    ],
    []
  );

  const inputdata = [
    {
      class: "survey",
      id: "survey-125345",
      new: true,
      newicon: <div></div>,
      title: "실시간 화상회의 웹 사전조사21311",
      date: "2022.02.21",
      seen: 15,
      comments: 3,
    },
    {
      class: "survey",
      id: "survey-1234215",
      new: true,
      newicon: <div></div>,
      title: "실시간 화상회의 웹 사전조사",
      date: "2022.02.21",
      seen: 15,
      comments: 3,
    },
    {
      class: "survey",
      id: "survey-1234445",
      new: true,
      newicon: <div></div>,
      title: "실시간 화상회의 웹 사전조사",
      date: "2022.02.21",
      seen: 15,
      comments: 3,
    },
    {
      class: "survey",
      id: "survey-1254345",
      new: true,
      newicon: <div></div>,
      title: "실시간 화상회의 웹 사전조사",
      date: "2022.02.21",
      seen: 15,
      comments: 3,
    },
    {
      class: "survey",
      id: "survey-1236545",
      new: false,
      newicon: <div></div>,
      title: "실시간 화상회의 웹 사전조사",
      date: "2022.02.21",
      seen: 15,
      comments: 3,
    },
    {
      class: "survey",
      id: "survey-12365445",
      new: false,
      newicon: <div></div>,
      title: "실시간 화상회의 웹 사전조사",
      date: "2022.02.21",
      seen: 15,
      comments: 3,
    },
    {
      class: "survey",
      id: "survey-1234845",
      new: false,
      newicon: <div></div>,
      title: "실시간 화상회의 웹 사전조사",
      date: "2022.02.21",
      seen: 15,
      comments: 3,
    },
    {
      class: "survey",
      id: "survey-1237845",
      new: false,
      newicon: <div></div>,
      title: "실시간 화상회의 웹 사전조사",
      date: "2022.02.21",
      seen: 15,
      comments: 3,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(inputdata);

  useEffect(() => {
    setData(
      inputdata.map((item) => (item.new ? { ...item, newicon: <NewSurvey /> } : { ...item, newicon: <OldSurvey /> }))
    );
  }, []);
  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <TableComponent columns={columns} data={data} handleInputOpen={handleModalOpen} upload="" />
      {isOpen && <></>}
    </Container>
  );
};

export default MySurvey;
