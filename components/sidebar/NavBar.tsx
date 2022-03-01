import React, { useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import Logo from "./logo";
import sidebarData, { LogOutIcon, MyPageIcon } from "./data";
import NavBarDetail from "./NavBarDetail";
import NavDetail from "./NavBarDetail";

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
  padding: 30px 0px 30px 0px;
  width: 100%;
  height: 50px;
  text-align: center;
`;

const NavMenu = styled.a`
  font-size: 18px;
  cursor: pointer;
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
  padding-top: 20px;
  cursor: pointer;
`;

export default function NavBar() {
  // const router = useRouter();
  const [showDetail, setShowDetail] = useState(false);
  const clickSidebar = () => {
    setShowDetail(!showDetail);
    console.log("click");
  };
  return (
    <React.Fragment>
      <Nav>
        <Logo />
        <NavListWrapper>
          {sidebarData.map((v, i) => (
            <NavList key={`sidebar-${i}`} onClick={() => setShowDetail(true)}>
              <Link href={v.link}>
                <NavMenu>{v.icon}</NavMenu>
              </Link>
            </NavList>
          ))}
        </NavListWrapper>
        <SettingWrapper>
          <NavList>
            <Link href="/mypage">
              <NavMenu>
                <MyPageIcon />
              </NavMenu>
            </Link>
            <LogOutdiv onClick={() => console.log("logout")}>
              <LogOutIcon />
            </LogOutdiv>
          </NavList>
        </SettingWrapper>
      </Nav>
      <button style={{ position: "fixed", left: showDetail ? "380px" : "100px" }} onClick={clickSidebar}>
        show
      </button>
      {showDetail && <NavBarDetail />}
    </React.Fragment>
  );
}
{
  /* <NavBarDetail /> */
}
