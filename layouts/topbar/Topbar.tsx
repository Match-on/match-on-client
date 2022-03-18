import React from "react";

import DirectMsg from "../../components/DirectMsg";
import Notification from "../../components/Notification";

import styled from "@emotion/styled";

const Top = styled.div`
  position: absolute;
  width: calc(100% - 70px);
  height: 50px;
  top: 0;
  left: 70px;
  background-color: #f2f7f7;
  border: 1px solid black;
`;

const TopWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  right: 0;
  width: 200px;
  height: 100%;
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
