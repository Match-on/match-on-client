import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import TabMain from "../../components/myprojects/tabmenu/Tabmain";
import MeetingLog from "../../components/myprojects/tabmenu/MeetingLog";
import VedioConference from "../../components/myprojects/tabmenu/VedioConference";
import Drive from "../../components/myprojects/tabmenu/Drive";
import Vote from "../../components/myprojects/tabmenu/Vote";
import Notice from "../../components/myprojects/tabmenu/Notice";
import Calendar from "../../components/myprojects/tabmenu/Calendar";
import TeamMember from "../../components/myprojects/tabmenu/TeamMember";

const MyprojectPage = styled.div`
  position: absolute;
  width: calc(100% - 8%);
  margin-left: 4%;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  margin-bottom: 80px;
`;

const Title = styled.div`
  padding: 0 10px 0 10px;
  font-size: 24px;
  font-weight: 400;
  border-left: 4px solid #50d5d5;
  text-align: center;
  cursor: pointer;
`;

const SubTitle = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #aaaaaa;
`;

const MainContent = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Tab = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TabMenu = styled.div<{ clicked: boolean }>`
  width: calc(100% / 6);
  height: 35px;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => (props.clicked ? "#aaaaaa" : "#000000")};
  border-bottom: 2px solid #47d2d2;
  cursor: pointer;
  &:hover {
    color: #000000;
    background-color: white;
    border: 2px solid #47d2d2;
    border-radius: 10px 10px 0 0;
    border-bottom: none;
  }
`;

const tabContArr = [
  { tabTitle: "회의록" },
  { tabTitle: "화상 회의" },
  { tabTitle: "드라이브" },
  { tabTitle: "투표" },
  { tabTitle: "공지사항" },
  { tabTitle: "달력" },
  { tabTitle: "팀원" },
];

export default function Detail() {
  const [tab, setTab] = useState(0);
  const [clicked, setClicked] = useState<boolean>(false);
  const router = useRouter();
  const { project_id } = router.query;

  const handleTabMenu = (index) => {
    setTab(index + 1);
    if (index === tab - 1) {
      setClicked(!clicked);
    }
  };

  return (
    <MyprojectPage>
      <Header>
        <Title onClick={() => handleTabMenu(-1)}>Match-On</Title>
        <SubTitle>"ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"</SubTitle>
      </Header>
      <MainContent>
        <Tab>
          {tabContArr.map((v, index) => (
            <TabMenu onClick={() => handleTabMenu(index)} key={`tab-${index}`} clicked={clicked}>
              {v.tabTitle}
            </TabMenu>
          ))}
        </Tab>
        <Container>
          {tab === 0 && <TabMain />}
          {tab === 1 && <MeetingLog />}
          {tab === 2 && <VedioConference />}
          {tab === 3 && <Drive />}
          {tab === 4 && <Vote />}
          {tab === 5 && <Notice />}
          {tab === 6 && <Calendar />}
          {tab === 7 && <TeamMember />}
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
