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
  display: grid;
`;

const MainContent = styled.div`
  position: fixed;
  width: calc(100% - 5rem);
  height: calc(100% - 2.5rem);
  left: 5em;
  top: 2.5rem;
  overflow: auto;
`;

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutContainer>
      <Header />
      <NavBar />
      <Topbar />
      <MainContent id="main">{children}</MainContent>
    </LayoutContainer>
  );
}
