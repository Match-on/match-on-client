import Head from "next/head";
import React from "react";
import Header from "./Header";
import NavBar from "./sidebar/NavBar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <React.Fragment>
      <Header />
      <NavBar />
      {children}
    </React.Fragment>
  );
}
