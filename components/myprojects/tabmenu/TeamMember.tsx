import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import MemberBox from "../components/MemberBox";

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-evenly;
  align-self: flex-end;
  background-color: #ffffff;
`;

const AddContainer = styled.div`
  width: 16.8rem;
  height: 16.5rem;
  margin: 1.8rem 1.5rem;
  padding: 2%;
  display: flex;
  background-color: #ffffff;
  box-shadow: 0px 0px 0.625em rgba(0, 0, 0, 0.25);
  border-radius: 1.25rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin: 1rem 1rem;
  }
  font-size: 4rem;
`;

const teamMember = [
  { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
  { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
  { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
  { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
  { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
  { name: "조성훈", school: "중앙대학교", list: ["aaaaaaa", "bbbbbb", "cccccc"] },
];

const TeamMember = (props) => {
  // const [teamIdx, setTeamIdx] = useState(null);
  // const [members, setMembers] = useState([]);
  // useEffect(() => {
  //   setTeamIdx(props.teamIdx);
  //   setMembers(props.members);
  // }, []);
  return (
    <Container>
      {teamMember.map((member, i) => (
        <MemberBox name={member.name} school={member.school} list={member.list} key={`member-${i}`} />
      ))}
      <AddContainer>+</AddContainer>
    </Container>
  );
};

export default TeamMember;
