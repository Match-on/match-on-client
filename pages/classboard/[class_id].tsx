import React, { useState } from "react";
import { useRouter } from "next/router";

import styled from "@emotion/styled";
import FreeBoard from "../../components/ClassBoard/TabContents/FreeBoard";
import InfoBoard from "../../components/ClassBoard/TabContents/InfoBoard";
import RecruitBoard from "../../components/ClassBoard/TabContents/RecruitBoard";
import { useSelector } from "react-redux";
import { RootState } from "../../src/redux/store";
import { useAppDispatch } from "../../src/hooks/hooks";
import { unSelectRow } from "../../src/redux/reducers/tableRow";
import InfoOutput from "../../components/ClassBoard/components/Output/InfoOutput";
import TeamOutput from "../../components/ClassBoard/components/Output/TeamOutput";

const MyprojectPage = styled.div`
  position: absolute;
  width: calc(100% - 8%);
  height: 92%;
  margin-left: 4%;
  /* height: 100%; */
`;

const Header = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  margin-bottom: 3%;
`;

const Title = styled.div`
  padding: 0 0.625em 0 0.625em;
  font-size: 1.5rem;
  font-weight: 400;
  border-left: 0.25em solid #50d5d5;
  text-align: center;
`;

const SubTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  color: #aaaaaa;
`;

const MainContent = styled.div`
  width: 100%;
  height: 90%;
  font-size: 1rem;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: -1%;
  padding-top: 1%;
`;

const Tab = styled.div`
  width: 100%;
  height: 6%;
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
  width: calc(100% / 3);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  { tabNumber: 0, tabTitle: "자유게시판" },
  { tabNumber: 1, tabTitle: "정보게시판" },
  { tabNumber: 2, tabTitle: "팀원모집 게시판" },
];

const TabItem = ({ title, index, tab, handleTabMenu }) => {
  return (
    <TabMenu onClick={() => handleTabMenu(index)} clicked={index === tab}>
      {title}
    </TabMenu>
  );
};

export default function ClassDetail() {
  const [tab, setTab] = useState(0);
  const router = useRouter();
  const { class_id } = router.query; //class_id로 쿼리 던져서 정보 얻기
  const row = useSelector((state: RootState) => state.table.value);
  const dispatch = useAppDispatch();
  //이제 테이블에서 액션 디스패치하면 됨.
  // dispatch(userLogin({ name: "조성훈", age: 25, email: "bbb@bbb.bbb" }))
  const handleTabMenu = (index) => {
    console.log(`${index}clicked`);
    setTab(index);
    dispatch(unSelectRow());
  };

  return (
    <MyprojectPage>
      <Header>
        <Title>{class_id}</Title>
        <SubTitle>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</SubTitle>
      </Header>
      <MainContent>
        <Tab>
          {tabContArr.map((v, index) => (
            <TabItem title={v.tabTitle} index={index} tab={tab} handleTabMenu={handleTabMenu} key={`tab=${index}`} />
          ))}
        </Tab>
        <Container>
          {tab === 0 && row.class === "" && <FreeBoard />}
          {tab === 0 && row.class === "freeboard" && <InfoOutput />}
          {tab === 1 && row.class === "" && <InfoBoard />}
          {tab === 1 && row.class === "infoboard" && <InfoOutput />}
          {tab === 2 && row.class === "" && <RecruitBoard />}
          {tab === 2 && row.class === "recruitboard" && <TeamOutput />}
        </Container>
      </MainContent>
    </MyprojectPage>
  );
}

// export async function getStaticProps({ params }) {
//   const postData = getPostData(params.id)
//   return {
//     props: {
//       postData,
//     },
//   }
// }
