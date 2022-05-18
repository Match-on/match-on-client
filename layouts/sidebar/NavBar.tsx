import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styled from "@emotion/styled";
import { jsx, keyframes, css } from "@emotion/react";

import Logo, { LogoName } from "./logo";
import sidebarData from "./data";
//1536 864
const Nav = styled.div`
  position: fixed;
  background: white;
  top: 0;
  left: 0;
  width: 5em;
  height: 100%;
`;

const NavListWrapper = styled.ul`
  position: absolute;
  top: 10.875em;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
`;

const NavList = styled.li`
  width: 100%;
  height: 1.57em;
  margin-bottom: 2.32em;
  text-align: center;
  &:hover {
  }
`;

const NavMenu = styled.a`
  width: 100%;
  font-size: 1em;
  cursor: pointer;
  &:hover {
    color: #46d2d3;
  }
  svg {
    &:hover {
      stroke: #46d2d3;
    }
  }
`;

const NavDetail = styled.div`
  position: fixed;
  background: white;
  top: 0;
  left: -5em;
  width: 7.75em;
  height: 100%;
  background-color: white;
  z-index: 1;
  border-top-right-radius: 1.875em;
  border-bottom-right-radius: 1.875em;
`;

const NavDetailWrapper = styled.ul`
  position: absolute;
  top: 11em;
  left: 0.625em;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
`;

const NavDetailList = styled.li`
  width: 100%;
  width: 100%;
  height: 1.57em;
  margin-bottom: 2.32em;
`;

const NavBar: React.FC = () => {
  // const router = useRouter(); //router.pathname()이 query 붙었을 때 어떻게 되는지 확인하고 작업
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
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
      {isHover && (
        <NavDetail style={{ left: "80px" }}>
          <LogoName />
          <NavDetailWrapper>
            {sidebarData.map((v, i) => (
              <NavDetailList key={`sidebardetail-${i}`}>
                <Link href={v.link}>
                  <NavMenu>{v.text}</NavMenu>
                </Link>
              </NavDetailList>
            ))}
          </NavDetailWrapper>
        </NavDetail>
      )}
    </div>
  );
};

export default NavBar;

//https://bbbootstrap.com/snippets/bootstrap-5-sidebar-menu-toggle-button-34132202 --> 사이드바 참고
