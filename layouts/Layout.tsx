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
  width: calc(100% - 80px);
  height: 100%;
  left: 80px;
  top: 50px;
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
