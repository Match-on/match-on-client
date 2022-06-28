import React, { useState } from "react";
import { useRouter } from "next/router";

import styled from "@emotion/styled";

const StudyDetailPage = styled.div`
  width: 92%;
  background-color: white;
  margin: auto;
`;

const StudyTitle = styled.div`
  width: 9.6em;
  font-size: 1.5rem;
  font-weight: 400;
  border-left: 0.25rem solid #50d5d5;
  text-align: center;
  margin-bottom: 2.875rem;
`;

const StudyDetail = () => {
  const router = useRouter();
  const { study_id } = router.query;

  return (
    <>
      <StudyTitle>스터디</StudyTitle>
      <StudyDetailPage>HIHI</StudyDetailPage>
    </>
  );
};

export default StudyDetail;
