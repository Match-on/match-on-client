import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";
import sidebarData, { LogOutIcon, MyPageIcon } from "./data";

export default function NavBarDetail() {
  const DetailNav = styled.div`
    position: fixed;
    background: #edf4f4;
    top: 0;
    left: 100px;
    width: 280px;
    height: 100%;
  `;

  const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    height: 150px;
    width: 100%;
  `;

  const NavListWrapper = styled.ul`
    position: absolute;
    top: 170px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
  `;

  const NavList = styled.li`
    line-height: 1.5;
    padding: 20px 0px 20px 0px;
    width: 100%;
    height: 60px;
    text-align: center;
    &:hover {
      background-color: #d3dddd;
    }
    cursor: pointer;
  `;

  const NavMenu = styled.a`
    width: 100%;
    font-size: 18px;
    cursor: pointer;
  `;

  const SettingWrapper = styled.ul`
    position: absolute;
    display: flex;
    flex-direction: column;
    bottom: 60px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
  `;

  const LogOutdiv = styled.div`
    font-size: 18px;
    cursor: pointer;
  `;

  const router = useRouter();

  return (
    <DetailNav>
      <UserInfo>
        <div style={{ width: "80px", height: "80px", background: "#fffddd", borderRadius: "30px" }}></div>
        <div style={{ width: "100%", textAlign: "center" }}>user Info</div>
      </UserInfo>
      <NavListWrapper>
        {sidebarData.map((v, i) => (
          <Link href={v.link} key={`side-detail-${i}`}>
            <NavList style={router.pathname === `${v.link}` ? { backgroundColor: "#D3DDDD" } : {}}>
              <NavMenu>{v.text}</NavMenu>
            </NavList>
          </Link>
        ))}
      </NavListWrapper>
      <SettingWrapper>
        <NavList>
          <Link href="/mypage">
            <NavMenu>My Page</NavMenu>
          </Link>
        </NavList>
        <LogOutdiv onClick={() => console.log(router.pathname)}>Log Out</LogOutdiv>
      </SettingWrapper>
      <style jsx>{`
        .active {
          color: tomato;
        }
      `}</style>
    </DetailNav>
  );
}
