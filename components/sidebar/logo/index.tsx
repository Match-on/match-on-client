import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { ImHome } from "react-icons/im";

const LogoFrame = styled.div`
  width: 50px;
  height: 50px;

  .logo {
    position: relative;
    color: #fff;
    font-size: 28px;
    text-align: center;
    left: 35px;
    top: 20px;
    cursor: pointer;
  }
`;

const Logo = () => {
  return (
    <LogoFrame>
      <Link href={"/"}>
        <a style={{ width: "100%" }}>
          <ImHome className="logo" />
        </a>
      </Link>
    </LogoFrame>
  );
};

export default Logo;
