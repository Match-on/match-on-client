import React from "react";
import styled from "@emotion/styled";
import {
  AiOutlineProject,
  AiOutlineBook,
  AiOutlineCrown,
  AiOutlineCopy,
  AiOutlineMeh,
  AiOutlineLogout,
} from "react-icons/ai";
import { IconContext } from "react-icons/lib";

const sidebarData = [
  {
    link: "/myproject",
    text: "My Project",
    icon: (
      <IconContext.Provider value={{ color: "yellow", size: "26px" }}>
        <AiOutlineProject />
      </IconContext.Provider>
    ),
  },
  {
    link: "/classboard",
    text: "Class Board",
    icon: (
      <IconContext.Provider value={{ color: "yellow", size: "26px" }}>
        <AiOutlineBook />
      </IconContext.Provider>
    ),
  },
  {
    link: "/contest",
    text: "Contest",
    icon: (
      <IconContext.Provider value={{ color: "yellow", size: "26px" }}>
        <AiOutlineCrown />
      </IconContext.Provider>
    ),
  },
  {
    link: "/study",
    text: "Study",
    icon: (
      <IconContext.Provider value={{ color: "yellow", size: "26px" }}>
        <AiOutlineCopy />
      </IconContext.Provider>
    ),
  },
];

export const MyPageIcon = () => (
  <IconContext.Provider value={{ color: "yellow", size: "26px" }}>
    <AiOutlineMeh />
  </IconContext.Provider>
);

export const LogOutIcon = () => (
  <IconContext.Provider value={{ color: "yellow", size: "26px" }}>
    <AiOutlineLogout />
  </IconContext.Provider>
);

export default sidebarData;
