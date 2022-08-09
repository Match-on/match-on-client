import styled from "@emotion/styled";
import React from "react";

const BackTo = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  text-decoration-line: underline;
  color: #47d2d2;
`;

const BackToTable = () => {
  return <BackTo style={{ cursor: "pointer" }}>목록으로 돌아가기</BackTo>;
};

export default BackToTable;
