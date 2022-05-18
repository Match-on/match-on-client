import Head from "next/head";
import React from "react";
import Header from "./Header";
import NavBar from "./sidebar/NavBar";
import Topbar from "./topbar/Topbar";

import styled from "@emotion/styled";
//1536 864
//1367 645
type LayoutProps = {
  children: React.ReactNode;
};

const LayoutContainer = styled.div`
  display: gird;
`;

const MainContent = styled.div`
  position: fixed;
  width: calc(100% - 5em);
  height: calc(100% - 3.125em);
  left: 5em;
  top: 3.125em;
  overflow: auto;
`;

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutContainer>
      <Header />
      <NavBar />
      <Topbar />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
}
