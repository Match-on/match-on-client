import React from "react";

import Myproject from "../../public/side_myproject.svg";
import Classboard from "../../public/side_classboard.svg";
import Contest from "../../public/side_contest.svg";
import Study from "../../public/side_study.svg";
import Survey from "../../public/side_survey.svg";

const sidebarData = [
  {
    link: "/myproject",
    text: "My Project",
    icon: <Myproject />,
  },
  {
    link: "/classboard",
    text: "Class Board",
    icon: <Classboard />,
  },
  {
    link: "/contest",
    text: "Contest",
    icon: <Contest />,
  },
  {
    link: "/study",
    text: "Study",
    icon: <Study />,
  },
  {
    link: "/survey",
    text: "Survey",
    icon: <Survey />,
  },
];

export default sidebarData;
