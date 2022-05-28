import styled from "@emotion/styled";
import React from "react";
import { useAppDispatch } from "../../src/hooks/hooks";
import { unSelectRow } from "../../src/redux/reducers/tableRow";

const BackTo = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  text-decoration-line: underline;
  color: #47d2d2;
`;

const BackToTable = () => {
  const dispatch = useAppDispatch();
  return (
    <BackTo onClick={() => dispatch(unSelectRow())} style={{ cursor: "pointer" }}>
      목록으로 돌아가기
    </BackTo>
  );
};

export default BackToTable;
