import React from "react";
import styled from "@emotion/styled";
import MemberBox from "../components/MemberBox";

const Container = styled.div`
  width: 100%;
  height: 83%;
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
  margin-bottom: 40px;
`;

const teamMember = [
  { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
  { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
  { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
  { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
  { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
  { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
];

const TeamMember = () => {
  return (
    <Container>
      {teamMember.map((mem, i) => (
        <MemberBox name={mem.name} school={mem.school} list={mem.list} key={`mem-${i}`} />
      ))}
    </Container>
  );
};

export default TeamMember;
