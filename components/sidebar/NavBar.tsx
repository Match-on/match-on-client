import React, { useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import Logo from "./logo";
import sidebarData, { LogOutIcon, MyPageIcon } from "./data";
import NavBarDetail from "./NavBarDetail";

const Nav = styled.div`
  position: fixed;
  background: #d3dddd;
  top: 0;
  left: 0;
  width: 100px;
  height: 100%;
`;

const NavListWrapper = styled.ul`
  position: absolute;
  top: 150px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
`;

const NavList = styled.li`
  margin-bottom: 15px;
  width: 50px;
  height: 50px;
  text-align: center;
`;

const SettingWrapper = styled.ul`
  position: absolute;
  bottom: 70px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
`;

const LogOutdiv = styled.div`
  padding-top: 15px;
  cursor: pointer;
`;

export default function NavBar() {
  // const router = useRouter();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(true);
  const closeSidebar = () => setSidebar(false);
  return (
    <Nav>
      <Logo />
      <NavListWrapper>
        {sidebarData.map((v, i) => (
          <NavList key={`sidebar-${i}`}>
            <Link href={v.link}>
              <a>{v.icon}</a>
            </Link>
          </NavList>
        ))}
      </NavListWrapper>
      <SettingWrapper>
        <NavList>
          <Link href="/mypage">
            <a>
              <MyPageIcon />
            </a>
          </Link>
          <LogOutdiv onClick={() => console.log("logout")}>
            <LogOutIcon />
          </LogOutdiv>
        </NavList>
      </SettingWrapper>
    </Nav>
  );
}
{
  /* <NavBarDetail /> */
}
