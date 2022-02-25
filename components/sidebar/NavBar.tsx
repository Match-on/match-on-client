import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";

import Logo from "./logo";
import sidebarData from "./data";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  text-decoration: none;
  cursor: pointer;
`;

const NavList = styled.li``;

export default function NavBar() {
  const router = useRouter();
  return (
    <Nav>
      <Logo />
      <NavListWrapper>
        {sidebarData.map((v, i) => (
          <NavList key={`row-${i}`}>
            <Link href={v.link}>
              <a>{v.text}</a>
            </Link>
          </NavList>
        ))}
      </NavListWrapper>
    </Nav>
  );
}
