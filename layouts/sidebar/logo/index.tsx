import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { ImHome } from "react-icons/im";

const LogoFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  .logo {
    position: absolute;
    color: #fff;
    font-size: 28px;
    top: 35px;
    cursor: pointer;
    margin-left: 30px;
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

export default Logo;
