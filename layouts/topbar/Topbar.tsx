import React from "react";

import DirectMsg from "../../components/DirectMsg";
import Notification from "../../components/Notification";

import styled from "@emotion/styled";

const Top = styled.div`
  position: absolute;
  width: calc(100% - 80px);
  height: 50px;
  top: 0;
  left: 80px;
  background-color: #f2f7f7;
  border: 1px solid black;
`;

const TopWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  right: 50px;
  top: 10px;
  width: 150px;
  height: 100%;
  cursor: pointer;
`;

const Topbar: React.FC = () => {
  return (
    <Top>
      <TopWrapper>
        <DirectMsg />
        <Notification />
      </TopWrapper>
    </Top>
  );
};

export default Topbar;
