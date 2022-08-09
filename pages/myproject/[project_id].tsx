import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styled from "@emotion/styled";

import TabMain from "../../components/myprojects/tabmenu/TabMain/Tabmain";
import MeetingLog from "../../components/myprojects/tabmenu/MeetingLog";
import VedioConference from "../../components/myprojects/tabmenu/VedioConference";
import Drive from "../../components/myprojects/tabmenu/Drive";
import Vote from "../../components/myprojects/tabmenu/Vote";
import Notice from "../../components/myprojects/tabmenu/Notice";
import CalendarTab from "../../components/myprojects/tabmenu/CalendarTab";
import TeamMember from "../../components/myprojects/tabmenu/TeamMember";

import axios from "axios";
import { API_URL } from "../../components/api/API";
import { useSession } from "next-auth/react";

interface MemberInformation {
  memberIdx: number;
  name: string;
  role: string;
  status: string;
}
interface teamInformation {
  createdAt: string;
  deadline: string;
  description: string;
  id: string;
  members: MemberInformation[];
  name: string;
  teamIdx: number;
}

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
  cursor: pointer;
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
  width: calc(100% / 6);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  { tabNumber: 0, tabTitle: "회의록" },
  { tabNumber: 1, tabTitle: "화상 회의" },
  { tabNumber: 2, tabTitle: "드라이브" },
  { tabNumber: 3, tabTitle: "투표" },
  { tabNumber: 4, tabTitle: "공지사항" },
  { tabNumber: 5, tabTitle: "달력" },
  { tabNumber: 6, tabTitle: "팀원" },
];

const TabItem = ({ title, index, tab, handleTabMenu }) => {
  return (
    <TabMenu onClick={() => handleTabMenu(index)} clicked={index === tab - 1}>
      {title}
    </TabMenu>
  );
};

export default function ProjectDetail() {
  const [teamInfo, setTeamInfo] = useState<teamInformation>({
    createdAt: "",
    deadline: "",
    description: "",
    id: "",
    members: [],
    name: "",
    teamIdx: null,
  });

  const { data: session, status } = useSession();

  const [tab, setTab] = useState(0);
  const router = useRouter();
  const { project_id } = router.query;
  const handleTabMenu = (index) => {
    setTab(index + 1);
  };

  useEffect(() => {
    if (session?.user) {
      axios
        .get(API_URL + `teams/${project_id}`, {
          params: { type: "profile" },
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data.result);
          setTeamInfo(res.data.result);
        })
        .catch((err) => alert("팀 데이터 로딩 실패"));
    }
  }, [session]);

  return (
    <MyprojectPage>
      <Header>
        <Title onClick={() => handleTabMenu(-1)}>{teamInfo.name}</Title>
        <SubTitle>{teamInfo.description}</SubTitle>
      </Header>
      <MainContent>
        <Tab>
          {tabContArr.map((v, index) => (
            <TabItem title={v.tabTitle} index={index} tab={tab} handleTabMenu={handleTabMenu} key={`tab=${index}`} />
          ))}
        </Tab>
        <Container>
          {tab === 0 && <TabMain />}
          {tab === 1 && <MeetingLog />}
          {tab === 2 && <VedioConference />}
          {tab === 3 && <Drive />}
          {tab === 4 && <Vote />}
          {tab === 5 && <Notice />}
          {tab === 6 && <CalendarTab />}
          {/* {tab === 7 && <TeamMember teamIdx={teamInfo.teamIdx} member={teamInfo.members} />} */}
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
