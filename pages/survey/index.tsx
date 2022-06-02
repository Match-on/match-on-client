import React, { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import SurveyBoard from "../../components/Survey/SurveyBoard";
import MySurvey from "../../components/Survey/MySurvey";
import { useSelector } from "react-redux";
import { RootState } from "../../src/redux/store";
import { useAppDispatch } from "../../src/hooks/hooks";
import { unSelectRow } from "../../src/redux/reducers/tableRow";
import SurveyPost from "../../components/Survey/Output/SurveyPost";

const SurveyPage = styled.div`
  position: absolute;
  width: calc(100% - 8%);
  height: 100%;
  margin-left: 4%;
  /* height: 100%; */
`;

const Header = styled.div`
  width: 100%;
  height: 2.75em;
  display: flex;
  align-items: center;
  margin-bottom: 5em;
`;

const Title = styled.div`
  padding: 0 0.625em 0 0.625em;
  font-size: 1.5rem;
  font-weight: 400;
  border-left: 0.25em solid #50d5d5;
  text-align: center;
  cursor: pointer;
`;

const SubTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: #aaaaaa;
`;

const MainContent = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1rem;
`;

const Container = styled.div`
  width: 100%;
  height: 70%;
  margin-top: -1%;
  padding-top: 1%;
`;

const Tab = styled.div`
  width: 100%;
  height: 2.5em;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 0.5rem;
  }
  /* @media screen and (max-width: 450px) {
    font-size: 0.2rem;
  } */
`;

const TabMenu = styled.div<{ clicked: boolean }>`
  width: calc(100% / 2);
  height: 100%;
  line-height: 2.5em;
  text-align: center;
  font-size: 1em;
  font-weight: 400;
  background-color: ${(props) => (props.clicked ? "#ffffff" : "#F1F7F7")};
  color: ${(props) => (props.clicked ? "#000000" : "#aaaaaa")};
  border-bottom: ${(props) => (props.clicked ? "#ffffff" : "0.15em solid #47d2d2")};
  border-top: ${(props) => (props.clicked ? "0.15em solid #47d2d2" : "")};
  border-left: ${(props) => (props.clicked ? "0.15em solid #47d2d2" : "")};
  border-right: ${(props) => (props.clicked ? "0.15em solid #47d2d2" : "")};
  border-radius: ${(props) => (props.clicked ? "0.625em 0.625em 0 0" : "")};
  cursor: pointer;
  &:hover {
    color: #000000;
    background-color: white;
    border: 0.15em solid #47d2d2;
    border-radius: 0.625em 0.625em 0 0;
    border-bottom: none;
  }
`;

const tabContArr = [
  { tabNumber: 0, tabTitle: "설문조사 게시판" },
  { tabNumber: 1, tabTitle: "내가 쓴 설문조사" },
];

const TabItem = ({ title, index, tab, handleTabMenu }) => {
  return (
    <TabMenu onClick={() => handleTabMenu(index)} clicked={index === tab}>
      {title}
    </TabMenu>
  );
};

const survey: React.FC = () => {
  const [tab, setTab] = useState(0);
  const router = useRouter();

  const row = useSelector((state: RootState) => state.table.value);
  const dispatch = useAppDispatch();
  const handleTabMenu = (index) => {
    console.log(`${index}clicked`);
    setTab(index);
    dispatch(unSelectRow());
  };

  return (
    <SurveyPage>
      <Header>
        <Title onClick={() => handleTabMenu(0)}>설문조사 게시판</Title>
      </Header>
      <MainContent>
        <Tab>
          {tabContArr.map((v, index) => (
            <TabItem title={v.tabTitle} index={index} tab={tab} handleTabMenu={handleTabMenu} key={`tab=${index}`} />
          ))}
        </Tab>
        <Container>
          {tab === 0 && row.class === "" && <SurveyBoard />}
          {tab === 0 && row.class === "survey" && <SurveyPost id={row.id} />}
          {tab === 1 && row.class === "" && <MySurvey />}
          {tab === 1 && row.class === "survey" && <SurveyPost id={row.id} />}
        </Container>
      </MainContent>
    </SurveyPage>
  );
};

export default survey;
