import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { ImHome } from "react-icons/im";

const LogoFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 83px;
  text-align: center;
  .logo {
    display: inline-block;
    position: absolute;
    color: #fff;
    font-size: 30px;
    left: 20px;
    top: 43px;
    cursor: pointer;
    border: 1px solid black;
    background-color: #47d2d2;
  }
`;

const Logo = () => {
  return (
    <LogoFrame>
      <Link href={"/"}>
        <a>
          <ImHome className="logo" />
        </a>
      </Link>
    </LogoFrame>
  );
};

export const LogoName = () => {
  return <LogoFrame>match-on</LogoFrame>;
};

export default Logo;
