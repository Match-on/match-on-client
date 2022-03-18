import Head from "next/head";
import React from "react";
import Header from "./Header";
import NavBar from "./sidebar/NavBar";
import Topbar from "./topbar/Topbar";

import styled from "@emotion/styled";

type LayoutProps = {
  children: React.ReactNode;
};

const MainContent = styled.div`
  position: absolute;
  width: calc(100% - 70px);
  height: calc(100% - 50px);
  left: 70px;
  top: 50px;
  background-color: #f2f7f7;
`;

export default function Layout({ children }: LayoutProps) {
  return (
    <React.Fragment>
      <Header />
      <NavBar />
      <Topbar />
      <MainContent>{children}</MainContent>
    </React.Fragment>
  );
}
