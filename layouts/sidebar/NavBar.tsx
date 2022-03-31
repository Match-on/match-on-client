import React, { useEffect, useState } from "react";
import Link from "next/link";

import styled from "@emotion/styled";
import { jsx, keyframes, css } from "@emotion/react";

import Logo, { LogoName } from "./logo";
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
  height: 25px;
  margin-bottom: 37px;
  &:hover {
  }
`;

const NavMenu = styled.a`
  width: 100%;
  font-size: 16px;
  cursor: pointer;
`;
const smoothappear = keyframes`
  0%{
    transform:translateX(-114px);
  }
  50%{
    transform:translateX(-50px);
  }
  100%{
    transform:translateX(0);
  }
`;
const NavDetail = styled.div`
  position: fixed;
  background: white;
  top: 0;
  left: -70px;
  width: 114px;
  height: 100%;
  background-color: white;
  z-index: 1;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
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

const NavDetailList = styled.li`
  width: 100%;
  width: 100%;
  height: 25px;
  margin-bottom: 37px;
  &:hover {
  }
`;

const NavBar: React.FC = () => {
  // const router = useRouter();
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
        <NavDetail style={{ left: "70px" }}>
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
