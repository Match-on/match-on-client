import styled from "@emotion/styled";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../components/api/API";
import { ProjectBox } from "../../components/myprojects/components/BoxContainer";

interface teamImfo {
  teamIdx: number;
  name: string;
  type: string;
  description: string;
  memberCount: string;
  favorite: boolean;
  createdAt: string;
  deadline: string;
}

const MyprojectPage = styled.div`
  width: calc(100% - 8%);
  margin-left: 4%;
  height: 100%;
`;

const MyprojectTitle = styled.div`
  width: 9.6em;
  font-size: 1.5rem;
  font-weight: 400;
  border-left: 0.25rem solid #50d5d5;
  padding-left: 5px;
`;

const SubTitle = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin: 2.5em 0 1em 0;
  color: #aaaaaa;
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
`;

const myproject: NextPage = () => {
  const [teamData, setTeamData] = useState<teamImfo[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user) {
      axios
        .get(API_URL + "teams", {
          params: { userIdx: session.user.userIdx },
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then((res) => {
          setTeamData(res.data.result.teams);
          console.log(res);
        })
        .catch((err) => alert("팀 데이터 로딩 실패"));
    }
  }, [session]);
  return (
    <MyprojectPage>
      <MyprojectTitle>내 프로젝트</MyprojectTitle>
      <SubTitle>즐겨찾기</SubTitle>
      <ProjectContainer>
        {teamData
          .filter((p) => p.favorite)
          .map((v, i) => (
            <Link href={`/myproject/${v.teamIdx}`} key={`favorite-${i}`}>
              <a>
                <ProjectBox {...v} />
              </a>
            </Link>
          ))}
      </ProjectContainer>
      <SubTitle>내 프로젝트</SubTitle>
      <ProjectContainer>
        {teamData
          .filter((p) => !p.favorite)
          .map((v, i) => (
            <Link href={`/myproject/${v.teamIdx}`} key={`project-${i}`}>
              <a>
                <ProjectBox {...v} />
              </a>
            </Link>
          ))}
      </ProjectContainer>
    </MyprojectPage>
  );
};

export default myproject;
