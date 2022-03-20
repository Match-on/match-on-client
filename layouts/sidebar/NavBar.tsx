import React, { useEffect, useState } from "react";
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

const NavDetail1 = styled.div`
  position: fixed;
  background: white;
  top: 0;
  left: 70px;
  width: 114px;
  height: 100%;
  background-color: white;
  z-index: 1;
`;

const NavDetailWrapper = styled.ul`
  position: absolute;
  top: 174px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
`;

const NavDetail = styled.li`
  width: 100%;
  width: 25px;
  height: 25px;
  margin-bottom: 37px;
  &:hover {
    border: 2px solid black;
  }
`;

const NavBar: React.FC = () => {
  // const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  const handleClick = () => {
    setIsHover((prev) => !prev);
    console.log("clicked");
  };
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
          <button onClick={handleClick}>hihi</button>
        </NavListWrapper>
      </Nav>
      {isHover && (
        <NavDetail1>
          <NavDetailWrapper>
            {sidebarData.map((v, i) => (
              <NavDetail key={`sidebardetail-${i}`}>
                <Link href={v.link}>
                  <NavMenu>{v.text}</NavMenu>
                </Link>
              </NavDetail>
            ))}
          </NavDetailWrapper>
        </NavDetail1>
      )}
    </React.Fragment>
  );
};

export default NavBar;

//https://bbbootstrap.com/snippets/bootstrap-5-sidebar-menu-toggle-button-34132202 --> 사이드바 참고
