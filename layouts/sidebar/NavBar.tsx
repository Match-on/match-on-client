import React, { useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import Logo from "./logo";
import sidebarData from "./data";

const Nav = styled.div`
  position: fixed;
  background: #d3dddd;
  top: 0;
  left: 0;
  width: 96px;
  height: 100%;
`;

const NavListWrapper = styled.ul`
  position: absolute;
  top: 196px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
`;

const NavList = styled.li`
  width: 100%;
  width: 25px;
  height: 25px;
  margin-bottom: 40px;
`;

const NavMenu = styled.a`
  cursor: pointer;
`;

const NavBar: React.FC = () => {
  // const router = useRouter();
  return (
    <React.Fragment>
      <Nav>
        <Logo />
        <NavListWrapper>
          {sidebarData.map((v, i) => (
            <NavList key={`sidebar-${i}`}>
              <Link href={v.link}>
                <NavMenu>{v.icon}</NavMenu>
              </Link>
            </NavList>
          ))}
        </NavListWrapper>
      </Nav>
    </React.Fragment>
  );
};

export default NavBar;
