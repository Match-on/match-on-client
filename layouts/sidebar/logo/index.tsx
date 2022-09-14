import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import MatchOnLogo from "../../../public/MatchOnLogo.svg";

const LogoFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 83px;
  text-align: center;
  line-height: 83px;
  cursor: pointer;
  z-index: 1;
  font-size: 1.25rem;
  color: #47d2d2;
  &:hover {
    font-weight: 550;
  }
`;

const Logo = () => {
  return (
    <LogoFrame>
      <Link href={"/main"}>
        <a>
          <MatchOnLogo />
        </a>
      </Link>
    </LogoFrame>
  );
};

export const LogoName = () => {
  return (
    <LogoFrame>
      <Link href={"/main"}>
        <a>match-on</a>
      </Link>
    </LogoFrame>
  );
};

export default Logo;
