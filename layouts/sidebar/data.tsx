import React from "react";

import { FaRegBookmark } from "react-icons/fa";
import Myproject from "../../public/side_myproject.svg";
import Classboard from "../../public/side_classboard.svg";
import Contest from "../../public/side_contest.svg";
import Study from "../../public/side_study.svg";
import Survey from "../../public/side_survey.svg";

const sidebarData = [
  {
    link: "/myproject",
    text: "My Project",
    icon: <FaRegBookmark width="24px" />,
  },
  {
    link: "/classboard",
    text: "Class Board",
    icon: <Classboard stroke="#aaaaaa" fill="#aaaaaa" />,
  },
  {
    link: "/contest",
    text: "Contest",
    icon: <Contest stroke="#aaaaaa" fill="#aaaaaa" />,
  },
  {
    link: "/study",
    text: "Study",
    icon: <Study stroke="#aaaaaa" />,
  },
  {
    link: "/survey",
    text: "Survey",
    icon: <Survey stroke="#aaaaaa" />,
  },
];

export default sidebarData;
