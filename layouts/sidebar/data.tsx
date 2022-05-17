import React from "react";

import Myproject from "../../public/sidebarSVG/side_myproject.svg";
import Classboard from "../../public/sidebarSVG/side_classboard.svg";
import Contest from "../../public/sidebarSVG/side_contest.svg";
import Study from "../../public/sidebarSVG/side_study.svg";
import Survey from "../../public/sidebarSVG/side_survey.svg";

const sidebarData = [
  {
    link: "/myproject",
    text: "My Project",
    icon: <Myproject stroke="#aaaaaa" />,
  },
  {
    link: "/classboard",
    text: "Class Board",
    icon: <Classboard stroke="#aaaaaa" />,
  },
  {
    link: "/contest",
    text: "Contest",
    icon: <Contest stroke="#aaaaaa" />,
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
