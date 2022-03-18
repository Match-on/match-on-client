import React, { useState } from "react";
import Link from "next/link";

import styled from "@emotion/styled";

import Logo from "./logo";
import sidebarData from "./data";

const Nav = styled.div`
  position: fixed;
  background: white;
  top: 0;
  left: 0;
  width: 70px;
  height: 100%;
`;

const NavListWrapper = styled.ul`
  position: absolute;
  top: 174px;
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
  margin-bottom: 37px;
  &:hover {
    border: 2px solid black;
  }
`;

const NavMenu = styled.a`
  cursor: pointer;
`;

const NavDetail = styled.div<{ left: string }>`
  position: fixed;
  width: 200px;
  height: 100%;
  left: ${({ left }) => left || "-130px"};
  z-index: 0;
  transition: all 0.35s;
  background-color: white;
`;

const NavBar: React.FC = () => {
  // const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  setTimeout(() => {
    setIsHover(true);
    console.log("완료1");
  }, 1000);
  setTimeout(() => {
    console.log("abc");
  });
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
        {isHover && <NavDetail left="70px" />}
      </Nav>
    </React.Fragment>
  );
};

export default NavBar;
