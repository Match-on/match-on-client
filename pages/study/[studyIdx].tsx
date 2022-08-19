import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styled from "@emotion/styled";
import { API_URL } from "../../components/api/API";
import axios from "axios";
import { useSession } from "next-auth/react";
import PostContent from "../../components/Study/Post/PostContent";

const StudyPostPage = styled.div`
  position: absolute;
  width: calc(100% - 8%);
  height: 95%;
  margin-left: 4%;
  /* height: 100%; */
`;

const Header = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  margin-bottom: 2%;
`;
const Title = styled.div`
  padding: 0 0.625em 0 0.625em;
  font-size: 1.5rem;
  font-weight: 400;
  border-left: 0.25em solid #50d5d5;
  text-align: center;
`;
const MainContent = styled.div`
  width: 100%;
  height: 92%;
  font-size: 1rem;
  background: #ffffff;
`;

const StudyDetail = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const { studyIdx } = router.query;

  return (
    <StudyPostPage>
      <Header>
        <Title>스터디</Title>
      </Header>
      <MainContent>
        <PostContent />
      </MainContent>
    </StudyPostPage>
  );
};

export default StudyDetail;
