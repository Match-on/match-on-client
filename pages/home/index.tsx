import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import FileContainer from "../../components/sub/FileContainer";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";
import styled from "@emotion/styled";

const HeartIcon = styled.div`
  width: 20px;
  height: 20px;
  background: #ea2027;
  position: relative;
  transform: rotate(45deg);

  &:before,
  &:after {
    content: "";
    width: 20px;
    height: 20px;
    position: absolute;
    border-radius: 50%;
    background: #ea2027;
  }
  &:before {
    left: -50%;
  }
  &:after {
    top: -50%;
  }
`;

const Home: NextPage = () => {
  return (
    <div>
      <HeartIcon />
    </div>
  );
};

export default Home;
//클릭이벤트로 onchange랑
